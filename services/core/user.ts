export * as User from "./user";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { faker } from "@faker-js/faker";
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

      otp: {
        type: "string",
        required: true,
        default: () => faker.datatype.number({
          min: 100000,
          max: 999999,
        }).toString()
      },

      confirmed: {
        type: "boolean",
        required: true,
        default: () => false,
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
