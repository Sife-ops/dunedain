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

builder.mutationFields((t) => ({
  createArticle: t.field({
    type: ArticleType,
    args: {
      title: t.arg.string({ required: true }),
      url: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => Article.create(args.title, args.url),
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
        const categories = await dunedainModel.entities.BookmarkCategoryEntity.create(
          {
            userId,
            bookmarkId: bookmark.bookmarkId,
            categoryId,
          }
        ).go();
      }

      return bookmark;
    },
  }),
}));
