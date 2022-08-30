import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    ID: string,
    String: string,
    Boolean: boolean,
}

export interface Article {
    id: Scalars['ID']
    title: Scalars['String']
    url: Scalars['String']
    __typename: 'Article'
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
    createArticle: Article
    __typename: 'Mutation'
}

export interface Query {
    articles: Article[]
    bookmark: Bookmark
    bookmarks: Bookmark[]
    categories: Category[]
    __typename: 'Query'
}

export interface ArticleRequest{
    id?: boolean | number
    title?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
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
    createArticle?: [{title: Scalars['String'],url: Scalars['String']},ArticleRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    articles?: ArticleRequest
    bookmark?: BookmarkRequest
    bookmarks?: BookmarkRequest
    categories?: CategoryRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Article_possibleTypes: string[] = ['Article']
export const isArticle = (obj?: { __typename?: any } | null): obj is Article => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isArticle"')
  return Article_possibleTypes.includes(obj.__typename)
}



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


export interface ArticlePromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface ArticleObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
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
    createArticle: ((args: {title: Scalars['String'],url: Scalars['String']}) => ArticlePromiseChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Promise<FieldsSelection<Article, R>>})
}

export interface MutationObservableChain{
    createArticle: ((args: {title: Scalars['String'],url: Scalars['String']}) => ArticleObservableChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Observable<FieldsSelection<Article, R>>})
}

export interface QueryPromiseChain{
    articles: ({get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>[]) => Promise<FieldsSelection<Article, R>[]>}),
    bookmark: (BookmarkPromiseChain & {get: <R extends BookmarkRequest>(request: R, defaultValue?: FieldsSelection<Bookmark, R>) => Promise<FieldsSelection<Bookmark, R>>}),
    bookmarks: ({get: <R extends BookmarkRequest>(request: R, defaultValue?: FieldsSelection<Bookmark, R>[]) => Promise<FieldsSelection<Bookmark, R>[]>}),
    categories: ({get: <R extends CategoryRequest>(request: R, defaultValue?: FieldsSelection<Category, R>[]) => Promise<FieldsSelection<Category, R>[]>})
}

export interface QueryObservableChain{
    articles: ({get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>[]) => Observable<FieldsSelection<Article, R>[]>}),
    bookmark: (BookmarkObservableChain & {get: <R extends BookmarkRequest>(request: R, defaultValue?: FieldsSelection<Bookmark, R>) => Observable<FieldsSelection<Bookmark, R>>}),
    bookmarks: ({get: <R extends BookmarkRequest>(request: R, defaultValue?: FieldsSelection<Bookmark, R>[]) => Observable<FieldsSelection<Bookmark, R>[]>}),
    categories: ({get: <R extends CategoryRequest>(request: R, defaultValue?: FieldsSelection<Category, R>[]) => Observable<FieldsSelection<Category, R>[]>})
}