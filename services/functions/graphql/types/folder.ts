import { BookmarkType } from "./bookmark";
import { Folder } from "@dunedain/core/folder";
import { builder } from "../builder";
import { dunedainModel } from "@dunedain/core/model";

export const FolderType = builder.objectRef<Folder.FolderEntityType>("Folder");

FolderType.implement({
  fields: (t) => ({
    userId: t.exposeString("userId"),
    folderId: t.exposeString("folderId"),
    parentFolderId: t.exposeString("parentFolderId"),
    title: t.exposeString("title"),
    color: t.exposeString("color"),

    folders: t.loadableList({
      type: FolderType,
      resolve: (parent) => parent.folderId,
      load: async (folderIds: string[], { user: { userId } }) => {
        const {
          data: folders,
        } = await dunedainModel.entities.FolderEntity.query
          .user({ userId })
          .go();

        return folderIds.map((folderId) => {
          if (folderId === "") {
            return [];
          } else {
            return folders.filter(
              (folder) => folder.parentFolderId === folderId
            );
          }
        });
      },
    }),

    bookmarks: t.loadableList({
      type: BookmarkType,
      resolve: (parent) => parent.folderId,
      load: async (folderIds: string[], { user: { userId } }) => {
        const {
          data: bookmarks,
        } = await dunedainModel.entities.BookmarkEntity.query
          .user({ userId })
          .go();

        return folderIds.map((folderId) => {
          return bookmarks.filter(
            (bookmark) => bookmark.parentFolderId === folderId
          );
        });
      },
    }),
  }),
});
