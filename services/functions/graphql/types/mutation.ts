import { Article } from "@dunedain/core/article";
import { dunedainModel } from "@dunedain/core/model";
import { BookmarkType } from "./bookmark";
import { ArticleType } from "./article";
import { builder } from "../builder";

const bookmarkCreateInput = builder.inputType("bookmarkCreateInput", {
  fields: (t) => ({
    title: t.string({ required: true }),
    url: t.string({ required: true }),
    categoryIds: t.stringList({ required: true }),
  }),
});

const bookmarkUpdateInput = builder.inputType("bookmarkUpdateInput", {
  fields: (t) => ({
    title: t.string({ required: true }),
    url: t.string({ required: true }),
    categoryIds: t.stringList({ required: true }),
    bookmarkId: t.string({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  createArticle: t.field({
    type: ArticleType,
    args: {
      title: t.arg.string({ required: true }),
      url: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => Article.create(args.title, args.url),
  }),

  bookmarkEdit: t.field({
    type: BookmarkType,
    args: {
      input: t.arg({ type: bookmarkUpdateInput, required: true }),
    },
    resolve: async (
      _,
      { input: { bookmarkId, categoryIds, title, url } },
      { user: { userId } }
    ) => {
      await dunedainModel.entities.BookmarkEntity.update({
        userId,
        bookmarkId,
      })
        .set({ title, url })
        .go();

      const categoryBookmarks = await dunedainModel.entities.BookmarkCategoryEntity.query
        .bookmarkCategory({ bookmarkId })
        .go();

      await dunedainModel.entities.BookmarkCategoryEntity.delete(
        categoryBookmarks
      ).go();

      for (const categoryId of categoryIds) {
        await dunedainModel.entities.BookmarkCategoryEntity.create({
          userId,
          bookmarkId,
          categoryId,
        }).go();
      }

      {
        const [bookmark] = await dunedainModel.entities.BookmarkEntity.query
          .user({
            userId,
            bookmarkId,
          })
          .go();
        return bookmark;
      }
    },
  }),

  bookmarkCreate: t.field({
    type: BookmarkType,
    args: {
      input: t.arg({ type: bookmarkCreateInput, required: true }),
    },
    resolve: async (
      _,
      { input: { categoryIds, title, url } },
      { user: { userId } }
    ) => {
      const bookmark = await dunedainModel.entities.BookmarkEntity.create({
        url,
        title,
        userId,
      }).go();

      for (const categoryId of categoryIds) {
        await dunedainModel.entities.BookmarkCategoryEntity.create({
          userId,
          bookmarkId: bookmark.bookmarkId,
          categoryId,
        }).go();
      }

      return bookmark;
    },
  }),
}));
