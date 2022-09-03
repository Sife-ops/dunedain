import AWS from 'aws-sdk';
import { Config } from "@serverless-stack/node/config";
import { dunedainModel } from '@dunedain/core/model';

const S3 = new AWS.S3();

interface Bookmark {
  id: number;
  url: string;
  description: string;
  userId: number;
}

interface Category {
  id: number;
  name: string;
  userId: number;
}

interface BookmarkCategory {
  bookmarkId: number | string;
  categoryId: number | string;
}

interface UserData {
  bookmarks: Bookmark[];
  categories: Category[];
  bookmarkCategories: BookmarkCategory[];
}

export const handler = async ({ userId }: { userId: string }) => {
  if (!userId) {
    throw new Error('input userId missing');
  }

  const res = await S3.listObjects({
    Bucket: Config.BUCKET_NAME
  }).promise();

  const latest = res.Contents?.sort((a: any, b: any) => {
    return b.LastModified - a.LastModified;
  })[0];

  if (!latest) {
    throw new Error('no files');
  }

  const obj = await S3.getObject({
    Bucket: Config.BUCKET_NAME,
    Key: latest.Key!
  }).promise();

  console.log('latest object', obj);

  const userData = JSON.parse(obj.Body?.toString()!) as UserData;

  let bookmarkCategories = userData.bookmarkCategories;

  for (const bookmark of userData.bookmarks) {
    const b = await dunedainModel
      .entities
      .BookmarkEntity
      .create({
        userId,
        title: bookmark.description,
        url: bookmark.url
      })
      .go()

    bookmarkCategories = bookmarkCategories.map(e => {
      if (e.bookmarkId === bookmark.id) {
        return {
          ...e,
          bookmarkId: b.bookmarkId
        }
      }
      return e;
    })
  }

  for (const category of userData.categories) {
    const c = await dunedainModel
      .entities
      .CategoryEntity
      .create({
        userId,
        title: category.name,
      })
      .go()

    bookmarkCategories = bookmarkCategories.map(e => {
      if (e.categoryId === category.id) {
        return {
          ...e,
          categoryId: c.categoryId
        }
      }
      return e;
    })
  }

  bookmarkCategories = bookmarkCategories.filter(e => {
    if (typeof e.categoryId === 'string' && typeof e.bookmarkId === 'string') {
      return true;
    }
    return false;
  })

  for (const { bookmarkId, categoryId } of bookmarkCategories) {
    await dunedainModel
      .entities
      .BookmarkCategoryEntity
      .create({
        userId,
        categoryId: categoryId as string,
        bookmarkId: bookmarkId as string,
      })
      .go()
  }

  console.log('done')

}
