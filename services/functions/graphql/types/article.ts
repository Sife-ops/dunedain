import { Article } from "@dunedain/core/article";
import { Bookmark } from "@dunedain/core/bookmark";
import { Category } from "@dunedain/core/category";
import { builder } from "../builder";
import { dunedainModel } from "@dunedain/core/model";

const ArticleType = builder
  .objectRef<Article.ArticleEntityType>("Article")
  .implement({
    fields: (t) => ({
      id: t.exposeID("articleID"),
      title: t.exposeString("title"),
      url: t.exposeString("url"),
    }),
  });

const CategoryType = builder
  .objectRef<Category.CategoryEntityType>("Category")
  .implement({
    fields: (t) => ({
      userId: t.exposeString("userId"),
      categoryId: t.exposeString("categoryId"),
      title: t.exposeString("title"),

      // // todo: circular definition?

      // bookmarks: t.field({
      //   type: [BookmarkType],
      //   resolve: () => {
      //     return []
      //   }
      // })
    }),
  });

const BookmarkType = builder
  .objectRef<Bookmark.BookmarkEntityType>("Bookmark")
  .implement({
    fields: (t) => ({
      userId: t.exposeString("userId"),
      bookmarkId: t.exposeString("bookmarkId"),
      url: t.exposeString("url"),
      title: t.exposeString("title"),

      categories: t.loadableList({
        type: CategoryType,
        load: async (ids: string[], { user: { userId } }) => {
          const {
            BookmarkCategoryEntity,
            CategoryEntity,
          } = await dunedainModel.collections
            .userBookmarkCategory({ userId })
            .go();

          // todo: need sort?
          return ids.map((bookmarkId) => {
            const categoryIds = BookmarkCategoryEntity.filter(
              (e) => e.bookmarkId === bookmarkId
            ).map((e) => e.categoryId);

            const categories = CategoryEntity.filter((e) =>
              categoryIds.find((id) => id === e.categoryId)
            );

            return categories;
          });
        },
        resolve: (parent) => parent.bookmarkId,
      }),
    }),
  });

builder.queryFields((t) => ({
  articles: t.field({
    type: [ArticleType],
    resolve: () => Article.list(),
  }),

  bookmarks: t.field({
    type: [BookmarkType],
    resolve: async (_, __, { user: { userId } }) => {
      return await dunedainModel.entities.BookmarkEntity.query
        .user({ userId })
        .go();
    },
  }),

  bookmark: t.field({
    type: BookmarkType,
    resolve: async () => {
      return {
        userId: "a",
        bookmarkId: "a",
        url: "a",
        title: "a",
        categories: [
          {
            userId: "a",
            categoryId: "a",
            title: "a",
          },
        ],
      };
    },
  }),
}));

builder.mutationFields((t) => ({
  createArticle: t.field({
    type: ArticleType,
    args: {
      title: t.arg.string({ required: true }),
      url: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => Article.create(args.title, args.url),
  }),
}));
