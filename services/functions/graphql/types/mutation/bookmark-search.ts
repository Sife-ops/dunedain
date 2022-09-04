import { BookmarkType } from "../bookmark";
import { builder } from "../../builder";
import { dunedainModel } from "@dunedain/core/model";

const CategoryOptEnum = builder.enumType('CategoryOptEnum', {
  values: { And: {}, Or: {} },
});

const bookmarkSearchInput = builder.inputType("bookmarkSearchInput", {
  fields: (t) => ({
    categoryIds: t.stringList({ required: true }),
    categoryOpt: t.field({
      type: CategoryOptEnum,
      required: true
    })
  }),
});

builder.mutationFields((t) => ({
  bookmarkSearch: t.field({
    type: [BookmarkType],
    args: {
      input: t.arg({ type: bookmarkSearchInput, required: true })
    },
    resolve: async (_, { input: { categoryIds, categoryOpt } }, { user: { userId } }) => {
      let bookmarks = await dunedainModel.entities.BookmarkEntity.query.user({
        userId
      }).go()

      if (categoryIds.length > 0) {
        const bookmarkCategories = await dunedainModel
          .entities
          .BookmarkCategoryEntity
          .query
          .user({ userId })
          .go();

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

