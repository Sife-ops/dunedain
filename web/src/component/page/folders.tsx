import Logo from "../../assets/favicon.svg";
import React, { useState } from "react";
import { AiOutlineFolder, AiOutlineFolderOpen } from "react-icons/ai";
import { Folder as FolderType } from "@dunedain/graphql/genql/schema";
import { useGlobalContext } from "../../hook/global-context";

export const Folders: React.FC = () => {
  return (
    <div>
      <FoldersComponent />
    </div>
  );
};

export const FoldersComponent: React.FC = () => {
  const {
    foldersResponse: [foldersQueryState],
  } = useGlobalContext();

  return (
    <div>
      {foldersQueryState.data?.folders.map((e) => (
        // @ts-ignore
        <Folder key={e.folderId} folder={e} />
      ))}
    </div>
  );
};

export const Folder: React.FC<{ folder: FolderType }> = (props) => {
  const {
    selectedFolders: { isExpanded, toggleExapanded },
  } = useGlobalContext();

  return (
    <div>
      <div
        className="flex items-center"
        onClick={() => toggleExapanded(props.folder.folderId)}
        style={{
          cursor: "pointer",
        }}
      >
        <div className="mr-2">
          {isExpanded(props.folder.folderId) ? (
            <AiOutlineFolderOpen />
          ) : (
            <AiOutlineFolder />
          )}
        </div>
        {props.folder.title}
      </div>
      {isExpanded(props.folder.folderId) && (
        <div className="ml-3">
          {props.folder.folders.map((e) => (
            <Folder key={e.folderId} folder={e} />
          ))}
          {props.folder.bookmarks.map((e) => (
            <div
              key={e.bookmarkId}
              className="flex items-center"
              style={{
                cursor: "pointer",
              }}
            >
              <img
                // todo: duplicated from home.tsx
                src={(() => {
                  if (e.favicon) {
                    return `data:image/png;base64,${e.favicon}`;
                  } else {
                    return Logo;
                  }
                })()}
                className="w-[16px] h-[16px] mr-2"
              />
              <a href={e.url} target="_blank">
                {e.title}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
