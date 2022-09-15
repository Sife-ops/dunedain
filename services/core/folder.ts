export * as Folder from "./folder";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const FolderEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Folder",
      service: "scratch",
    },
    attributes: {
      userId: {
        type: "string",
        required: true,
      },

      folderId: {
        type: "string",
        required: true,
        default: () => ulid(),
      },

      parentFolderId: {
        type: "string",
        required: true,
        default: ""
      },

      title: {
        type: "string",
        required: true,
      },
      color: {
        type: "string",
        required: true,
        default: 'grey',
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
          composite: ['folderId'],
        },
      },

    },
  },
  Dynamo.Configuration
);

export type FolderEntityType = EntityItem<typeof FolderEntity>;
