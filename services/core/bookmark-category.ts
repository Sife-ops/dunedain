export * as BookmarkCategory from "./bookmark";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const BookmarkCategoryEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "BookmarkCategory",
      service: "scratch",
    },
    attributes: {
      userId: {
        type: "string",
        required: true,
      },

      bookmarkCategoryId: {
        type: "string",
        required: true,
        default: () => ulid(),
      },

      bookmarkId: {
        type: "string",
        required: true,
      },

      categoryId: {
        type: "string",
        required: true,
      },

    },
    indexes: {

      user: {
        collection: 'user',
        pk: {
          field: "pk",
          composite: ['userId'],
        },
        sk: {
          field: "sk",
          composite: ['bookmarkCategoryId'],
        },
      },

      bookmarkCategory: {
        collection: 'bookmark',
        index: 'gsi1',
        pk: {
          field: "gsi1pk",
          composite: ['bookmarkId'],
        },
        sk: {
          field: "gsi1sk",
          composite: ['categoryId'],
        },
      },

      categoryBookmark: {
        collection: 'category',
        index: 'gsi2',
        pk: {
          field: "gsi2pk",
          composite: ['categoryId'],
        },
        sk: {
          field: "gsi2sk",
          composite: ['bookmarkId'],
        },
      },

    },
  },
  Dynamo.Configuration
);

export type BookmarkCategoryEntityType = EntityItem<typeof BookmarkCategoryEntity>;

