import { Folder } from "@dunedain/graphql/genql/schema";
import { UseFoldersResponse } from "../query/folders";
import { useEffect, useState } from "react";

export interface UseSelectedFolders {
  folders: Record<string, boolean> | undefined;
  toggleExapanded: (folderId: string) => void;
  isExpanded: (folderId: string) => boolean;
}

export const useSelectedFolders = ([
  foldersResponseState,
]: UseFoldersResponse): UseSelectedFolders => {
  const [folders, setFolders] = useState<Record<string, boolean>>();

  const fn1 = (
    folders: Folder[],
    selectedFolders?: Record<string, boolean>
  ) => {
    let a = {};

    for (let i = 0; i < folders.length; i++) {
      const folder = folders[i];

      if (folder.folders.length > 0) {
        const b = fn1(folder.folders, selectedFolders);

        a = {
          ...a,
          ...b,
        };
      }

      const found =
        selectedFolders !== undefined
          ? selectedFolders[folder.folderId]
          : false;

      a = {
        ...a,
        [folder.folderId]: found,
      };
    }

    return a;
  };

  useEffect(() => {
    const { fetching, data, error } = foldersResponseState;
    if (!fetching && !error && data) {
      setFolders((s) => {
        console.log(fn1(data.folders, s));
        return fn1(data.folders, s);
      });
    }
  }, [foldersResponseState.data]);

  const toggleExapanded = (folderId: string) => {
    setFolders((s) => ({
      ...s,
      [folderId]: s !== undefined ? !s[folderId] : false,
    }));
  };

  const isExpanded = (folderId: string) => {
    return folders !== undefined ? folders[folderId] : false;
  };

  return {
    folders,
    toggleExapanded,
    isExpanded,
  };
};
