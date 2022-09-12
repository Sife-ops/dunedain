export * as Bookmark from "./bookmark";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const BookmarkEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Bookmark",
      service: "scratch",
    },
    attributes: {
      userId: {
        type: "string",
        required: true,
      },

      bookmarkId: {
        type: "string",
        required: true,
        default: () => ulid(),
      },

      url: {
        type: "string",
        required: true,
      },

      title: {
        type: "string",
        required: true,
      },
      favicon: {
        type: "string",
        required: true,
        default: '',
      }
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
          composite: ['bookmarkId'],
        },
      },

      bookmark: {
        collection: 'bookmark',
        index: 'gsi1',
        pk: {
          field: "gsi1pk",
          composite: ['bookmarkId'],
        },
        sk: {
          field: "gsi1sk",
          composite: ['userId'],
        },
      },

    },
  },
  Dynamo.Configuration
);

export type BookmarkEntityType = EntityItem<typeof BookmarkEntity>;

