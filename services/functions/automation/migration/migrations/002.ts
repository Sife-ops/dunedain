import { dunedainModel } from "@dunedain/core/model";

export const _002 = {
  description: "added parentFolderId to bookmarks",
  up: async () => {
    const bookmarks = await dunedainModel.entities.BookmarkEntity.scan.go();

    for (const bookmark of bookmarks) {
      const result = await dunedainModel.entities.BookmarkEntity
        .update(bookmark)
        .set({ parentFolderId: "" })
        .go();

      console.log(result);
    }
  },
  down: () => { },
};

