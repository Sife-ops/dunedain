import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    String: string,
    Boolean: boolean,
}

export interface Bookmark {
    bookmarkId: Scalars['String']
    categories: Category[]
    title: Scalars['String']
    url: Scalars['String']
    userId: Scalars['String']
    __typename: 'Bookmark'
}

export interface Category {
    bookmarks: Bookmark[]
    categoryId: Scalars['String']
    title: Scalars['String']
    userId: Scalars['String']
    __typename: 'Category'
}

export interface Mutation {
    bookmarkCreate: Bookmark
    bookmarkDelete: Bookmark
    bookmarkEdit: Bookmark
    categoryCreate: Category
    categoryDelete: Category
    categoryEdit: Category
    __typename: 'Mutation'
}

export interface Query {
    bookmark: Bookmark
    bookmarks: Bookmark[]
    categories: Category[]
    __typename: 'Query'
}

export interface BookmarkRequest{
    bookmarkId?: boolean | number
    categories?: CategoryRequest
    title?: boolean | number
    url?: boolean | number
    userId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CategoryRequest{
    bookmarks?: BookmarkRequest
    categoryId?: boolean | number
    title?: boolean | number
    userId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    bookmarkCreate?: [{input: bookmarkCreateInput},BookmarkRequest]
    bookmarkDelete?: [{bookmarkId: Scalars['String']},BookmarkRequest]
    bookmarkEdit?: [{input: bookmarkUpdateInput},BookmarkRequest]
    categoryCreate?: [{title: Scalars['String']},CategoryRequest]
    categoryDelete?: [{categoryId: Scalars['String']},CategoryRequest]
    categoryEdit?: [{categoryId: Scalars['String'],title: Scalars['String']},CategoryRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    bookmark?: [{bookmarkId: Scalars['String']},BookmarkRequest]
    bookmarks?: BookmarkRequest
    categories?: CategoryRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface bookmarkCreateInput {categoryIds: Scalars['String'][],title: Scalars['String'],url: Scalars['String']}

export interface bookmarkUpdateInput {bookmarkId: Scalars['String'],categoryIds: Scalars['String'][],title: Scalars['String'],url: Scalars['String']}


const Bookmark_possibleTypes: string[] = ['Bookmark']
export const isBookmark = (obj?: { __typename?: any } | null): obj is Bookmark => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isBookmark"')
  return Bookmark_possibleTypes.includes(obj.__typename)
}



const Category_possibleTypes: string[] = ['Category']
export const isCategory = (obj?: { __typename?: any } | null): obj is Category => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCategory"')
  return Category_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes: string[] = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes: string[] = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}


export interface BookmarkPromiseChain{
    bookmarkId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    categories: ({get: <R extends CategoryRequest>(request: R, defaultValue?: FieldsSelection<Category, R>[]) => Promise<FieldsSelection<Category, R>[]>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    userId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface BookmarkObservableChain{
    bookmarkId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    categories: ({get: <R extends CategoryRequest>(request: R, defaultValue?: FieldsSelection<Category, R>[]) => Observable<FieldsSelection<Category, R>[]>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    userId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface CategoryPromiseChain{
    bookmarks: ({get: <R extends BookmarkRequest>(request: R, defaultValue?: FieldsSelection<Bookmark, R>[]) => Promise<FieldsSelection<Bookmark, R>[]>}),
    categoryId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    userId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface CategoryObservableChain{
    bookmarks: ({get: <R extends BookmarkRequest>(request: R, defaultValue?: FieldsSelection<Bookmark, R>[]) => Observable<FieldsSelection<Bookmark, R>[]>}),
    categoryId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    userId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface MutationPromiseChain{
    bookmarkCreate: ((args: {input: bookmarkCreateInput}) => BookmarkPromiseChain & {get: <R extends BookmarkRequest>(request: R, defaultValue?: FieldsSelection<Bookmark, R>) => Promise<FieldsSelection<Bookmark, R>>}),
    bookmarkDelete: ((args: {bookmarkId: Scalars['String']}) => BookmarkPromiseChain & {get: <R extends BookmarkRequest>(request: R, defaultValue?: FieldsSelection<Bookmark, R>) => Promise<FieldsSelection<Bookmark, R>>}),
    bookmarkEdit: ((args: {input: bookmarkUpdateInput}) => BookmarkPromiseChain & {get: <R extends BookmarkRequest>(request: R, defaultValue?: FieldsSelection<Bookmark, R>) => Promise<FieldsSelection<Bookmark, R>>}),
    categoryCreate: ((args: {title: Scalars['String']}) => CategoryPromiseChain & {get: <R extends CategoryRequest>(request: R, defaultValue?: FieldsSelection<Category, R>) => Promise<FieldsSelection<Category, R>>}),
    categoryDelete: ((args: {categoryId: Scalars['String']}) => CategoryPromiseChain & {get: <R extends CategoryRequest>(request: R, defaultValue?: FieldsSelection<Category, R>) => Promise<FieldsSelection<Category, R>>}),
    categoryEdit: ((args: {categoryId: Scalars['String'],title: Scalars['String']}) => CategoryPromiseChain & {get: <R extends CategoryRequest>(request: R, defaultValue?: FieldsSelection<Category, R>) => Promise<FieldsSelection<Category, R>>})
}

export interface MutationObservableChain{
    bookmarkCreate: ((args: {input: bookmarkCreateInput}) => BookmarkObservableChain & {get: <R extends BookmarkRequest>(request: R, defaultValue?: FieldsSelection<Bookmark, R>) => Observable<FieldsSelection<Bookmark, R>>}),
    bookmarkDelete: ((args: {bookmarkId: Scalars['String']}) => BookmarkObservableChain & {get: <R extends BookmarkRequest>(request: R, defaultValue?: FieldsSelection<Bookmark, R>) => Observable<FieldsSelection<Bookmark, R>>}),
    bookmarkEdit: ((args: {input: bookmarkUpdateInput}) => BookmarkObservableChain & {get: <R extends BookmarkRequest>(request: R, defaultValue?: FieldsSelection<Bookmark, R>) => Observable<FieldsSelection<Bookmark, R>>}),
    categoryCreate: ((args: {title: Scalars['String']}) => CategoryObservableChain & {get: <R extends CategoryRequest>(request: R, defaultValue?: FieldsSelection<Category, R>) => Observable<FieldsSelection<Category, R>>}),
    categoryDelete: ((args: {categoryId: Scalars['String']}) => CategoryObservableChain & {get: <R extends CategoryRequest>(request: R, defaultValue?: FieldsSelection<Category, R>) => Observable<FieldsSelection<Category, R>>}),
    categoryEdit: ((args: {categoryId: Scalars['String'],title: Scalars['String']}) => CategoryObservableChain & {get: <R extends CategoryRequest>(request: R, defaultValue?: FieldsSelection<Category, R>) => Observable<FieldsSelection<Category, R>>})
}

export interface QueryPromiseChain{
    bookmark: ((args: {bookmarkId: Scalars['String']}) => BookmarkPromiseChain & {get: <R extends BookmarkRequest>(request: R, defaultValue?: FieldsSelection<Bookmark, R>) => Promise<FieldsSelection<Bookmark, R>>}),
    bookmarks: ({get: <R extends BookmarkRequest>(request: R, defaultValue?: FieldsSelection<Bookmark, R>[]) => Promise<FieldsSelection<Bookmark, R>[]>}),
    categories: ({get: <R extends CategoryRequest>(request: R, defaultValue?: FieldsSelection<Category, R>[]) => Promise<FieldsSelection<Category, R>[]>})
}

export interface QueryObservableChain{
    bookmark: ((args: {bookmarkId: Scalars['String']}) => BookmarkObservableChain & {get: <R extends BookmarkRequest>(request: R, defaultValue?: FieldsSelection<Bookmark, R>) => Observable<FieldsSelection<Bookmark, R>>}),
    bookmarks: ({get: <R extends BookmarkRequest>(request: R, defaultValue?: FieldsSelection<Bookmark, R>[]) => Observable<FieldsSelection<Bookmark, R>[]>}),
    categories: ({get: <R extends CategoryRequest>(request: R, defaultValue?: FieldsSelection<Category, R>[]) => Observable<FieldsSelection<Category, R>[]>})
}