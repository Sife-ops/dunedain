import { BookmarkType } from "./bookmark";
import { CategoryType } from "./category";
import { builder } from "../builder";
import { dunedainModel } from "@dunedain/core/model";

builder.queryFields((t) => ({
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

  category: t.field({
    type: CategoryType,
    args: {
      categoryId: t.arg.string({ required: true })
    },
    resolve: async (_, { categoryId }, { user: { userId } }) => {
      const [category] = await dunedainModel.entities.CategoryEntity.query
        .user({ userId, categoryId })
        .go();

      return category;
    },
  }),

  bookmark: t.field({
    type: BookmarkType,
    args: {
      bookmarkId: t.arg.string({ required: true }),
    },
    resolve: async (_, { bookmarkId }, { user: { userId } }) => {
      const [
        bookmark,
      ] = await dunedainModel.entities.BookmarkEntity.query
        .user({ userId, bookmarkId })
        .go();

      return bookmark;
    },
  }),
}));
