import { Folder } from "@dunedain/graphql/genql/schema";
import { UseFoldersResponse } from "../query/folders";
import { useEffect, useState } from "react";

export interface UseSelectedFolders {
  expandAll: () => void;
  folders: Record<string, boolean> | undefined;
  isExpanded: (folderId: string) => boolean;
  lastSelected: string;
  toggleExapanded: (folderId: string) => void;
  unexpandAll: () => void;
}

export const useSelectedFolders = (
  [foldersResponseState]: UseFoldersResponse,
  folderId?: string
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
    if (folderId) {
      setLastSelected(folderId);
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
    const isExpanded = selectedFolders[folderId];

    // todo: this is very questionable
    if (!isExpanded) {
      setLastSelected(folderId);
    } else {
      setLastSelected("");
    }

    setSelectedFolders((s) => ({
      ...s,
      [folderId]: !s[folderId],
    }));
  };

  const expandFn = (expand: boolean) => {
    let expanded = {};
    Object.keys(selectedFolders).map((e) => {
      expanded = {
        ...expanded,
        [e]: expand,
      };
    });
    setSelectedFolders((s) => ({
      ...s,
      ...expanded,
    }));
  };

  const expandAll = () => {
    expandFn(true);
  };

  const unexpandAll = () => {
    expandFn(false);
  };

  const isExpanded = (folderId: string) => {
    return selectedFolders !== undefined ? selectedFolders[folderId] : false;
  };

  return {
    folders: selectedFolders,
    expandAll,
    isExpanded,
    lastSelected,
    toggleExapanded,
    unexpandAll,
  };
};
