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
