import { FolderEntityType } from '@dunedain/core/folder';
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

  folderEdit: t.field({
    type: FolderType,
    args: {
      folderId: t.arg.string({ required: true }),
      parentFolderId: t.arg.string({ required: true }),
      title: t.arg.string({ required: true }),
      color: t.arg.string({ required: true }),
    },
    resolve: async (
      _,
      { title, color, folderId, parentFolderId },
      { user: { userId } }
    ) => {
      await dunedainModel.entities.FolderEntity
        .update({ userId, folderId })
        .set({
          parentFolderId,
          title,
          color,
        }).go();

      const [folder] = await dunedainModel.entities.FolderEntity.query
        .user({ userId, folderId })
        .go();

      return folder;
    },
  }),

  folderDelete: t.field({
    type: FolderType,
    args: {
      folderId: t.arg.string({ required: true }),
    },
    resolve: async (_, { folderId }, { user: { userId } }) => {
      // todo: subcollection
      const folders = await dunedainModel.entities.FolderEntity.query
        .user({ userId })
        .go();

      const bookmarks = await dunedainModel.entities.BookmarkEntity.query
        .user({ userId })
        .go();

      const deleteSubfolders = async (folder: FolderEntityType) => {
        const subfolders = folders.filter(e => e.parentFolderId === folder.folderId);
        const folderBookmarks = bookmarks.filter(e => e.parentFolderId === folder.folderId);

        for (const subfolder of subfolders) {
          await deleteSubfolders(subfolder);
        }

        await dunedainModel.entities.FolderEntity.delete(subfolders).go();

        for (const folderBookmark of folderBookmarks) {
          await dunedainModel.entities.BookmarkEntity
            .update(folderBookmark)
            .set({ parentFolderId: "" })
            .go();
        }
      }

      const folder = folders.find(e => e.folderId === folderId)

      if (folder) {
        await deleteSubfolders(folder);
        await dunedainModel.entities.FolderEntity
          .remove(folder)
          .go();

        return folder;
      }

      throw new Error('folder not found');
    },
  }),
}));
