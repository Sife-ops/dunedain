import AWS from "aws-sdk";
import { BookmarkType } from "../bookmark";
import { Config } from "@serverless-stack/node/config";
import { builder } from "../../builder";
import { dunedainModel } from "@dunedain/core/model";

const sqs = new AWS.SQS();

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
  bookmarkDelete: t.field({
    type: BookmarkType,
    args: {
      bookmarkId: t.arg.string({ required: true }),
    },
    resolve: async (_, { bookmarkId }, { user: { userId } }) => {
      // remove bookmark
      const [bookmark] = await dunedainModel.entities.BookmarkEntity.query
        .user({
          bookmarkId,
          userId,
        })
        .go();

      await dunedainModel.entities.BookmarkEntity
        .remove(bookmark)
        .go();

      // remove bookmark categories
      const bookmarkCategories = await dunedainModel.entities.BookmarkCategoryEntity.query
        .bookmarkCategory({ bookmarkId })
        .go();

      await dunedainModel.entities.BookmarkCategoryEntity.delete(
        bookmarkCategories
      ).go();

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

        await sqs
          .sendMessage({
            QueueUrl: Config.FAVICON_SQS!,
            MessageBody: JSON.stringify(bookmark),
          })
          .promise();

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

      await sqs
        .sendMessage({
          QueueUrl: Config.FAVICON_SQS!,
          MessageBody: JSON.stringify(bookmark),
        })
        .promise();

      return bookmark;
    },
  }),
}));
