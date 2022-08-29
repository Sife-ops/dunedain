import { Service } from "electrodb";

import { BookmarkCategoryEntity } from './bookmark-category'
import { BookmarkEntity } from './bookmark'
import { CategoryEntity } from './category'

export { BookmarkCategoryEntityType } from './bookmark-category'
export { BookmarkEntityType } from './bookmark'
export { CategoryEntityType } from './category'

export const dunedainModel = new Service({
  BookmarkCategoryEntity,
  BookmarkEntity,
  CategoryEntity,
})

