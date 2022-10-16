import AWS from "aws-sdk";
import { BookmarkType } from "../bookmark";
import { Config } from "@serverless-stack/node/config";
import { builder } from "../../builder";
import { dunedainModel } from "@dunedain/core/model";

const sqs = new AWS.SQS();

const bookmarkCreateInput = builder.inputType("bookmarkCreateInput", {
  fields: (t) => ({
    categoryIds: t.stringList({ required: true }),
    parentFolderId: t.string({ required: true }),
    title: t.string({ required: true }),
    url: t.string({ required: true }),
  }),
});

const bookmarkUpdateInput = builder.inputType("bookmarkUpdateInput", {
  fields: (t) => ({
    bookmarkId: t.string({ required: true }),
    categoryIds: t.stringList({ required: true }),
    parentFolderId: t.string({ required: true }),
    title: t.string({ required: true }),
    url: t.string({ required: true }),
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
      const {
        data: [bookmark],
      } = await dunedainModel.entities.BookmarkEntity.query
        .user({
          bookmarkId,
          userId,
        })
        .go();

      await dunedainModel.entities.BookmarkEntity.remove(bookmark).go();

      // remove bookmark categories
      const {
        data: bookmarkCategories,
      } = await dunedainModel.entities.BookmarkCategoryEntity.query
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
      { input: { bookmarkId, categoryIds, title, url, parentFolderId } },
      { user: { userId } }
    ) => {
      await dunedainModel.entities.BookmarkEntity.update({
        userId,
        bookmarkId,
      })
        .set({ title, url, parentFolderId })
        .go();

      const {
        data: categoryBookmarks,
      } = await dunedainModel.entities.BookmarkCategoryEntity.query
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
        const {
          data: [bookmark],
        } = await dunedainModel.entities.BookmarkEntity.query
          .user({
            userId,
            bookmarkId,
          })
          .go();

        await sqs
          .sendMessage({
            QueueUrl: Config.FAVICON_SQS!,
            MessageBody: JSON.stringify(bookmark),
            MessageGroupId: "favicon",
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
      { input: { categoryIds, title, url, parentFolderId } },
      { user: { userId } }
    ) => {
      const {
        data: bookmark,
      } = await dunedainModel.entities.BookmarkEntity.create({
        parentFolderId,
        title,
        url,
        userId,
      }).go();

      for (const categoryId of categoryIds) {
        await dunedainModel.entities.BookmarkCategoryEntity.create({
          bookmarkId: bookmark.bookmarkId,
          categoryId,
          userId,
        }).go();
      }

      await sqs
        .sendMessage({
          QueueUrl: Config.FAVICON_SQS!,
          MessageBody: JSON.stringify(bookmark),
          MessageGroupId: "favicon",
        })
        .promise();

      return bookmark;
    },
  }),
}));
