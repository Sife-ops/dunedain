export * as Category from "./category";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

const colors = [
  "whiteAlpha",
  "blackAlpha",
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
  "linkedin",
  "facebook",
  "messenger",
  "whatsapp",
  "twitter",
  "telegram",
];

export const CategoryEntity = new Entity(
  {
    model: {
      version: "1",
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
        type: colors,
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

