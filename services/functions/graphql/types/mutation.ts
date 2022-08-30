import { Article } from "@dunedain/core/article";
import { ArticleType } from './article';
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
}));

