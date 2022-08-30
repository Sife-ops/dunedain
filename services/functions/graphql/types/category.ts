import { BookmarkType } from "./bookmark";
import { Category } from "@dunedain/core/category";
import { builder } from "../builder";
import { dunedainModel } from "@dunedain/core/model";

export const CategoryType = builder.objectRef<Category.CategoryEntityType>(
  "Category"
);

CategoryType.implement({
  fields: (t) => ({
    userId: t.exposeString("userId"),
    categoryId: t.exposeString("categoryId"),
    title: t.exposeString("title"),

    bookmarks: t.loadableList({
      type: BookmarkType,
      load: async (categoryIds: string[], { user: { userId } }) => {
        const {
          BookmarkCategoryEntity,
          BookmarkEntity,
        } = await dunedainModel.collections.user({ userId }).go();

        return categoryIds.map((categoryId) => {
          const bookmarkIds = BookmarkCategoryEntity.filter(
            (e) => e.categoryId === categoryId
          ).map((e) => e.bookmarkId);

          return BookmarkEntity.filter((e) =>
            bookmarkIds.find((id) => id === e.bookmarkId)
          );
        });
      },
      resolve: (parent) => parent.categoryId,
    }),
  }),
});
