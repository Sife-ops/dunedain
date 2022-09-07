import { dunedainModel } from "@dunedain/core/model";

export const _000 = {
  description: "added color field to categories",
  up: async () => {
    const categories = await dunedainModel.entities.CategoryEntity.scan.go();

    for (const category of categories) {
      const result = await dunedainModel.entities.CategoryEntity.update(
        category
      )
        .set({
          color: "blue",
        })
        .go();

      console.log(result);
    }
  },
  down: () => {},
};
