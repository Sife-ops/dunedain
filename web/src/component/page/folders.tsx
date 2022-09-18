import React from "react";
import { Folders as FoldersComponent } from "../folders";
import { useGlobalContext } from "../../hook/global-context";

export const Folders: React.FC = () => {
  const { selectedFolders } = useGlobalContext();

  return (
    <div>
      <FoldersComponent addButton selectedFolders={selectedFolders} />
    </div>
  );
};
