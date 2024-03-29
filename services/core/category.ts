export * as Category from "./category";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const CategoryEntity = new Entity(
  {
    model: {
      version: "2",
      entity: "Category",
      service: "scratch",
    },
    attributes: {
      userId: {
        type: "string",
        required: true,
      },

      categoryId: {
        type: "string",
        required: true,
        default: () => ulid(),
      },

      title: {
        type: "string",
        required: true,
      },
      color: {
        type: 'string',
        required: true,
      }
    },
    indexes: {

      user: {
        collection: ['user', 'userBookmarkCategory'] as const,
        pk: {
          field: "pk",
          composite: ['userId'],
        },
        sk: {
          field: "sk",
          composite: ['categoryId'],
        },
      },

      category: {
        collection: 'category',
        index: 'gsi2',
        pk: {
          field: "gsi2pk",
          composite: ['categoryId'],
        },
        sk: {
          field: "gsi2sk",
          composite: ['userId'],
        },
      },

    },
  },
  Dynamo.Configuration
);

export type CategoryEntityType = EntityItem<typeof CategoryEntity>;

