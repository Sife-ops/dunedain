import { Bookmark } from "@dunedain/core/bookmark";
import { CategoryType } from "./category";
import { builder } from "../builder";
import { dunedainModel } from "@dunedain/core/model";

export const BookmarkType = builder.objectRef<Bookmark.BookmarkEntityType>(
  "Bookmark"
);

BookmarkType.implement({
  fields: (t) => ({
    userId: t.exposeString("userId"),
    bookmarkId: t.exposeString("bookmarkId"),
    url: t.exposeString("url"),
    title: t.exposeString("title"),

    categories: t.loadableList({
      type: CategoryType,
      resolve: (parent) => parent.bookmarkId,
      load: async (bookmarkIds: string[], { user: { userId } }) => {
        const {
          BookmarkCategoryEntity,
          CategoryEntity,
        } = await dunedainModel.collections
          .userBookmarkCategory({ userId })
          .go();

        // todo: need sort?
        return bookmarkIds.map((bookmarkId) => {
          const categoryIds = BookmarkCategoryEntity.filter(
            (e) => e.bookmarkId === bookmarkId
          ).map((e) => e.categoryId);

          return CategoryEntity.filter((e) =>
            categoryIds.find((id) => id === e.categoryId)
          );
        });
      },
    }),
  }),
});
