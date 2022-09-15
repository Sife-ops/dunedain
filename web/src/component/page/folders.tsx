import Logo from "../../assets/favicon.svg";
import React from "react";
import { Folder as FolderType } from "@dunedain/graphql/genql/schema";
import { useGlobalContext } from "../../hook/global-context";
import { useNavigate } from "react-router-dom";

import {
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineFolderAdd,
  AiOutlineFolderView,
} from "react-icons/ai";

import { BiFolderMinus } from "react-icons/bi";

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

  const nav = useNavigate();

  return (
    <div>
      <div className="flex gap-1">
        <AiOutlineFolderAdd onClick={() => nav("/folder/new")} />
        <AiOutlineFolderView />
        <BiFolderMinus />
      </div>
      {foldersQueryState.data?.folders.map((e) => (
        // @ts-ignore
        <Folder key={e.folderId} folder={e} />
      ))}
    </div>
  );
};

export const Folder: React.FC<{ folder: FolderType }> = (props) => {
  const {
    selectedFolders: { isExpanded, toggleExapanded, lastSelected },
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
        <div
          className={(() => {
            if (props.folder.folderId === "") return "";
            if (props.folder.folderId === lastSelected) return "underline";
            return "";
          })()}
        >
          {props.folder.title}
        </div>
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
