export * as User from "./user";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const UserEntity = new Entity(
  {
    model: {
      version: "2",
      entity: "User",
      service: "scratch",
    },
    attributes: {
      userId: {
        type: "string",
        required: true,
        default: () => ulid(),
      },

      email: {
        type: "string",
        required: true,
      },

      password: {
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
          composite: ['email'],
        },
      },

      email: {
        index: 'gsi1',
        pk: {
          field: "gsi1pk",
          composite: ['email'],
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

export type UserEntityType = EntityItem<typeof UserEntity>;
