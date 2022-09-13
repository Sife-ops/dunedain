import { FolderType } from '../folder';
import { builder } from "../../builder";
import { dunedainModel } from "@dunedain/core/model";

builder.mutationFields((t) => ({
  folderCreate: t.field({
    type: FolderType,
    args: {
      parentFolderId: t.arg.string({ required: true }),
      title: t.arg.string({ required: true }),
      color: t.arg.string({ required: true }),
    },
    resolve: async (_, { title, color, parentFolderId }, { user: { userId } }) => {
      const folder = await dunedainModel.entities.FolderEntity.create({
        userId,
        parentFolderId,
        title,
        color,
      }).go();

      return folder;
    },
  }),
}));
