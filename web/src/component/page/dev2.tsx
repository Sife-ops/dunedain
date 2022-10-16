import React, { useState } from "react";
import { useFolderCreateMutation } from "../../query/folder-create";
import { useFoldersQuery } from "../../query/folders";
import { Folder as FolderType } from "@dunedain/graphql/genql/schema";
import { useBookmarksQuery } from "../../query/bookmarks";

export const Dev2 = () => {
  return <div>dev2</div>;

  // const [bookmarksQueryState] = useBookmarksQuery();

  // React.useEffect(() => {
  //   const { fetching, data, error } = bookmarksQueryState;
  //   if (error) {
  //     console.log(error);
  //   } else if (!fetching && data) {
  //     console.log(data);
  //   }
  // }, [bookmarksQueryState.data]);

  // if (bookmarksQueryState.fetching) {
  //   return <div>loading...</div>;
  // }

  // return <div>{JSON.stringify(bookmarksQueryState.data)}</div>;
};
