// import AWS from 'aws-sdk';

import { dunedainModel } from "@dunedain/core/model";
import { faker } from "@faker-js/faker";
import { ulid } from "ulid";
import { z } from "zod";

export const handler = async (event: any) => {
  /*
   * validate event schema
   */

  console.log(event);

  const eventSchema = z.object({
    userId: z.string(),
  });

  const { userId } = eventSchema.parse(event);

  /*
   * user
   */

  await dunedainModel.entities.UserEntity.create({
    userId,
    email: "earl@futhermucker.com",
    password: "sup?",
  }).go();

  /*
   * bookmarks
   */

  let bookmarkIds = [];
  for (let i = 0; i < 5; i++) {
    bookmarkIds.push(ulid());
  }

  for (const bookmarkId of bookmarkIds) {
    await dunedainModel.entities.BookmarkEntity.create({
      userId,
      bookmarkId,
      url: faker.internet.url(),
      title: faker.word.noun(),
    }).go();
  }

  /*
   * categories
   */

  let categoryIds = [];
  for (let i = 0; i < 5; i++) {
    categoryIds.push(ulid());
  }

  for (const categoryId of categoryIds) {
    await dunedainModel.entities.CategoryEntity.create({
      userId,
      categoryId,
      title: faker.word.noun(),
      color: "blue",
    }).go();
  }

  /*
   * bookmark categories
   */

  await dunedainModel.entities.BookmarkCategoryEntity.create({
    userId,
    bookmarkId: bookmarkIds[0],
    categoryId: categoryIds[0],
  }).go();

  await dunedainModel.entities.BookmarkCategoryEntity.create({
    userId,
    bookmarkId: bookmarkIds[1],
    categoryId: categoryIds[1],
  }).go();

  await dunedainModel.entities.BookmarkCategoryEntity.create({
    userId,
    bookmarkId: bookmarkIds[2],
    categoryId: categoryIds[1],
  }).go();

  await dunedainModel.entities.BookmarkCategoryEntity.create({
    userId,
    bookmarkId: bookmarkIds[2],
    categoryId: categoryIds[2],
  }).go();
};
