import { Service } from "electrodb";

import { BookmarkCategoryEntity } from "./bookmark-category";
import { BookmarkEntity } from "./bookmark";
import { CategoryEntity } from "./category";
import { FolderEntity } from "./folder";

export const dunedainModel = new Service({
  BookmarkCategoryEntity,
  BookmarkEntity,
  CategoryEntity,
  FolderEntity,
});
