import { dunedainModel } from "@dunedain/core/model";

export const _001 = {
  description: "added favicon field to bookmarks",
  up: async () => {
    const bookmarks = await dunedainModel.entities.BookmarkEntity.scan.go();

    for (const bookmark of bookmarks) {
      const result = await dunedainModel.entities.BookmarkEntity.update(
        bookmark
      )
        .set({
          favicon: "",
        })
        .go();

      console.log(result);
    }
  },
  down: () => {},
};
