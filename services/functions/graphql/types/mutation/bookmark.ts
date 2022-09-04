import { BookmarkType } from "../bookmark";
import { builder } from "../../builder";
import { dunedainModel } from "@dunedain/core/model";

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

const CategoryEnum = builder.enumType('CategoryEnum', {
  values: { And: {}, Or: {} },
});

const bookmarkSearchInput = builder.inputType("bookmarkSearchInput", {
  fields: (t) => ({
    search: t.string({ required: true }),
    categoryIds: t.stringList({ required: true }),
    categoryOpt: t.field({
      type: CategoryEnum,
      required: true
    })
  }),
});

builder.mutationFields((t) => ({
  bookmarkDelete: t.field({
    type: BookmarkType,
    args: {
      bookmarkId: t.arg.string({ required: true }),
    },
    resolve: async (_, { bookmarkId }, { user: { userId } }) => {
      const [bookmark] = await dunedainModel.entities.BookmarkEntity.query
        .user({
          bookmarkId,
          userId,
        })
        .go();

      await dunedainModel.entities.BookmarkEntity.remove({
        bookmarkId,
        userId,
      }).go();

      return bookmark;
    },
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

  bookmarkSearch: t.field({
    type: [BookmarkType],
    args: {
      input: t.arg({ type: bookmarkSearchInput, required: true })
    },
    resolve: async (_, { input: { categoryIds, search, categoryOpt } }, { user: { userId } }) => {
      let bookmarks = await dunedainModel.entities.BookmarkEntity.query.user({
        userId
      }).go()

      if (search) {
        bookmarks = bookmarks.filter(e => e.title.includes(search));
      }

      if (categoryIds.length > 0) {
        const bookmarkCategories = await dunedainModel
          .entities
          .BookmarkCategoryEntity
          .query
          .user({ userId })
          .go()

        if (categoryOpt === 'And') {
          bookmarks = bookmarks.filter(b => {
            const bcs = bookmarkCategories
              .filter(bc => bc.bookmarkId === b.bookmarkId)
              .filter(bc => categoryIds.find(ci => ci === bc.categoryId));
            return bcs.length === categoryIds.length;
          })
        } else {
          bookmarks = bookmarks.filter(b => {
            return bookmarkCategories
              .filter(bc => bc.bookmarkId === b.bookmarkId)
              .find(bc => categoryIds.find(ci => ci === bc.categoryId));
          })
        }
      }

      return bookmarks;
    }
  })
}));

