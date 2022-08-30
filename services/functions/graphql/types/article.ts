import { Article } from "@dunedain/core/article";
import { builder } from "../builder";

export const ArticleType = builder
  .objectRef<Article.ArticleEntityType>("Article")
  .implement({
    fields: (t) => ({
      id: t.exposeID("articleID"),
      title: t.exposeString("title"),
      url: t.exposeString("url"),
    }),
  });
