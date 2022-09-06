import { CategoryType } from "../category";
import { builder } from "../../builder";
import { dunedainModel } from "@dunedain/core/model";

builder.mutationFields((t) => ({
  categoryDelete: t.field({
    type: CategoryType,
    args: {
      categoryId: t.arg.string({ required: true }),
    },
    resolve: async (_, { categoryId }, { user: { userId } }) => {
      // remove category
      const [category] = await dunedainModel.entities.CategoryEntity.query
        .user({
          userId,
          categoryId,
        })
        .go();

      await dunedainModel.entities.CategoryEntity.remove({
        categoryId,
        userId,
      }).go();

      // remove category bookmarks
      const categoryBookmarks = await dunedainModel.entities
        .BookmarkCategoryEntity
        .query
        .categoryBookmark({ categoryId })
        .go()

      await dunedainModel.entities.BookmarkCategoryEntity
        .delete(categoryBookmarks)
        .go()

      return category;
    },
  }),

  categoryEdit: t.field({
    type: CategoryType,
    args: {
      title: t.arg.string({ required: true }),
      categoryId: t.arg.string({ required: true }),
    },
    resolve: async (_, { categoryId, title }, { user: { userId } }) => {
      await dunedainModel.entities.CategoryEntity.update({
        categoryId,
        userId,
      })
        .set({
          title,
        })
        .go();

      const [category] = await dunedainModel.entities.CategoryEntity.query
        .user({
          userId,
          categoryId,
        })
        .go();

      return category;
    },
  }),

  categoryCreate: t.field({
    type: CategoryType,
    args: {
      title: t.arg.string({ required: true }),
    },
    resolve: async (_, { title }, { user: { userId } }) => {
      const category = await dunedainModel.entities.CategoryEntity.create({
        userId,
        title,
      }).go();

      return category;
    },
  }),
}));

