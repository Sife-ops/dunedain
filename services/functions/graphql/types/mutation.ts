import { Article } from "@dunedain/core/article";
import { dunedainModel } from "@dunedain/core/model";
import { BookmarkType } from "./bookmark";
import { ArticleType } from "./article";
import { builder } from "../builder";

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
      title: t.arg.string({ required: true }),
      url: t.arg.string({ required: true }),
    },
    resolve: async (_, args, context) => {
      return await dunedainModel.entities.BookmarkEntity.create({
        url: args.url,
        title: args.title,
        userId: context.user.userId,
      }).go();
    },
  }),
}));
