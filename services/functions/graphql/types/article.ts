import { Article } from "@dunedain/core/article";
import { Bookmark } from "@dunedain/core/bookmark";
import { Category } from "@dunedain/core/category";
import { builder } from "../builder";
import { dunedainModel } from '@dunedain/core/model';

const ArticleType = builder
  .objectRef<Article.ArticleEntityType>("Article")
  .implement({
    fields: t => ({
      id: t.exposeID("articleID"),
      title: t.exposeString("title"),
      url: t.exposeString("url")
    })
  });

const CategoryType = builder
  .objectRef<Category.CategoryEntityType>("Category")
  .implement({
    fields: t => ({
      userId: t.exposeString("userId"),
      categoryId: t.exposeString("categoryId"),
      title: t.exposeString("title"),
      // bookmarks: t.field({
      //   type: [BookmarkType],
      //   resolve: () => {
      //     return []
      //   }
      // })
    })
  });

const BookmarkType = builder
  .objectRef<Bookmark.BookmarkEntityType>("Bookmark")
  .implement({
    fields: t => ({
      userId: t.exposeString("userId"),
      bookmarkId: t.exposeString("bookmarkId"),
      url: t.exposeString("url"),
      title: t.exposeString("title"),

      categories: t.loadable({
        type: [CategoryType],
        load: async (ids: string[], { user: { userId } }) => {
          const categories = await dunedainModel
            .entities
            .CategoryEntity
            .query
            .user({ userId })
            .go()

          const bookmarkCategories = categories.filter(e => {
            if (ids.find(id => id === e.categoryId)) {
              return true;
            } else {
              return false;
            }
          })

          return bookmarkCategories;
        },
        resolve: async (parent) => {
          const bookmarkCategories = await dunedainModel
            .entities
            .BookmarkCategoryEntity
            .query
            .bookmarkCategory({
              bookmarkId: parent.bookmarkId
            }).go();

          return bookmarkCategories.map(e => e.categoryId);
        }
      })

      // categories: t.field({
      //   type: [CategoryType],
      //   resolve: async (parent) => {
      //     const bookmarkCategories = await dunedainModel
      //       .entities
      //       .BookmarkCategoryEntity
      //       .query
      //       .bookmarkCategory({ bookmarkId: parent.bookmarkId })
      //       .go()
      //     const categories = bookmarkCategories.map(async (e) => {
      //       const [category] = await dunedainModel
      //         .entities
      //         .CategoryEntity
      //         .query
      //         .category({ categoryId: e.categoryId })
      //         .go();
      //       return category;
      //     })
      //     return categories;
      //   }
      // })

    })
  });

builder.queryFields(t => ({
  articles: t.field({
    type: [ArticleType],
    resolve: () => Article.list()
  }),

  bookmarks: t.field({
    type: [BookmarkType],
    resolve: async (_, __, { user: { userId } }) => {
      return await dunedainModel
        .entities
        .BookmarkEntity
        .query
        .user({ userId })
        .go()
    }
  }),

  bookmark: t.field({
    type: BookmarkType,
    resolve: async () => {

      return {
        userId: 'a',
        bookmarkId: 'a',
        url: 'a',
        title: 'a',
        categories: [
          {
            userId: 'a',
            categoryId: 'a',
            title: 'a'
          }
        ]
      }

    }
  })
}));

builder.mutationFields(t => ({
  createArticle: t.field({
    type: ArticleType,
    args: {
      title: t.arg.string({ required: true }),
      url: t.arg.string({ required: true })
    },
    resolve: async (_, args) => Article.create(args.title, args.url)
  })
}));
