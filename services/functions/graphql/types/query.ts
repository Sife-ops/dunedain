import { Article } from "@dunedain/core/article";
import { ArticleType } from "./article";
import { BookmarkType } from "./bookmark";
import { CategoryType } from "./category";
import { builder } from "../builder";
import { dunedainModel } from "@dunedain/core/model";

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

  categories: t.field({
    type: [CategoryType],
    resolve: async (_, __, { user: { userId } }) => {
      return await dunedainModel.entities.CategoryEntity.query
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
