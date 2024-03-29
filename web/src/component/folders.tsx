import Logo from "../assets/favicon.svg";
import React from "react";
import { BiCog } from "react-icons/bi";
import { BiFolderMinus } from "react-icons/bi";
import { Folder as FolderType } from "@dunedain/graphql/genql/schema";
import { UseSelectedFolders } from "../hook/selected-folders";
import { useGlobalContext } from "../hook/global-context";
import { useNavigate } from "react-router-dom";

import {
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineFolderAdd,
  AiOutlineFolderView,
} from "react-icons/ai";

export const Folders: React.FC<{
  addButton?: boolean;
  editButtons?: boolean;
  selectedFolders: UseSelectedFolders;
}> = (props) => {
  const nav = useNavigate();

  const {
    foldersResponse: [foldersQueryState],
  } = useGlobalContext();

  return (
    <div>
      <div className="flex gap-1">
        {props.addButton && (
          <AiOutlineFolderAdd onClick={() => nav("/folder/new")} />
        )}
        <AiOutlineFolderView
          onClick={() => {
            props.selectedFolders.expandAll();
          }}
        />
        <BiFolderMinus
          onClick={() => {
            props.selectedFolders.unexpandAll();
          }}
        />
      </div>
      {foldersQueryState.data?.folders.map((e) => (
        <Folder
          editButtons={props.editButtons}
          folder={e}
          key={e.folderId}
          selectedFolders={props.selectedFolders}
        />
      ))}
    </div>
  );
};

const Folder: React.FC<{
  editButtons?: boolean;
  folder: FolderType;
  selectedFolders: UseSelectedFolders;
}> = (props) => {
  const nav = useNavigate();

  const { isExpanded, toggleExapanded, lastSelected } = props.selectedFolders;

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
        {props.editButtons && props.folder.folderId && (
          <BiCog
            className="ml-2"
            onClick={() => nav(`/folder/${props.folder.folderId}`)}
          />
        )}
      </div>
      {isExpanded(props.folder.folderId) && (
        <div className="ml-3">
          {props.folder.folders.map((e) => (
            <Folder
              editButtons={props.editButtons}
              folder={e}
              key={e.folderId}
              selectedFolders={props.selectedFolders}
            />
          ))}
          {props.folder.bookmarks.map((e) => (
            <div
              className="flex items-center"
              key={e.bookmarkId}
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
