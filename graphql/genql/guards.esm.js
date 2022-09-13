
var Bookmark_possibleTypes = ['Bookmark']
export var isBookmark = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isBookmark"')
  return Bookmark_possibleTypes.includes(obj.__typename)
}



var Category_possibleTypes = ['Category']
export var isCategory = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isCategory"')
  return Category_possibleTypes.includes(obj.__typename)
}



var Folder_possibleTypes = ['Folder']
export var isFolder = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isFolder"')
  return Folder_possibleTypes.includes(obj.__typename)
}



var Mutation_possibleTypes = ['Mutation']
export var isMutation = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



var Query_possibleTypes = ['Query']
export var isQuery = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}
