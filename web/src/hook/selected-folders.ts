import { Folder } from "@dunedain/graphql/genql/schema";
import { UseFoldersResponse } from "../query/folders";
import { useEffect, useState } from "react";

export interface UseSelectedFolders {
  folders: Record<string, boolean> | undefined;
  toggleExapanded: (folderId: string) => void;
  isExpanded: (folderId: string) => boolean;
  lastSelected: string;
}

export const useSelectedFolders = (
  [foldersResponseState]: UseFoldersResponse,
  folder?: Folder
): UseSelectedFolders => {
  const [selectedFolders, setSelectedFolders] = useState<
    Record<string, boolean>
  >({});
  const [lastSelected, setLastSelected] = useState("");

  const updateDictionary = (
    folders: Folder[],
    selectedFolders: Record<string, boolean>
  ) => {
    let a = {};

    for (let i = 0; i < folders.length; i++) {
      const folder = folders[i];

      if (folder.folders.length > 0) {
        const b = updateDictionary(folder.folders, selectedFolders);

        a = {
          ...a,
          ...b,
        };
      }

      const found = selectedFolders[folder.folderId];

      a = {
        ...a,
        [folder.folderId]: found !== undefined ? found : false,
      };
    }

    return a;
  };

  useEffect(() => {
    if (folder) {
      setLastSelected(folder.folderId);
    }
  }, []);

  useEffect(() => {
    const { fetching, data, error } = foldersResponseState;
    if (!fetching && !error && data) {
      setSelectedFolders((s) => {
        return updateDictionary(data.folders, s);
      });
    }
  }, [foldersResponseState.data]);

  const toggleExapanded = (folderId: string) => {
    const selectedFolder = selectedFolders[folderId];

    if (!selectedFolder) {
      setLastSelected(folderId);
    } else {
      setLastSelected("");
    }

    setSelectedFolders((s) => ({
      ...s,
      [folderId]: !s[folderId],
    }));
  };

  const isExpanded = (folderId: string) => {
    return selectedFolders !== undefined ? selectedFolders[folderId] : false;
  };

  return {
    folders: selectedFolders,
    isExpanded,
    lastSelected,
    toggleExapanded,
  };
};
