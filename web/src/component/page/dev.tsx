import React, { useState } from "react";
import { useFolderCreateMutation } from "../../query/folder-create";
import { useFoldersQuery } from "../../query/folders";
import { Folder as FolderType } from "@dunedain/graphql/genql/schema";

export const Dev = () => {
  const [foldersResponse] = useFoldersQuery();
  const [_, folderCreate] = useFolderCreateMutation();

  const [title, setTitle] = useState("");
  const [parentFolderId, setParentFolderId] = useState("");

  React.useEffect(() => {
    if (!foldersResponse.fetching) {
      console.log(foldersResponse.data);
    }
  }, [foldersResponse.data]);

  return (
    <div>
      <h3>new folder</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          folderCreate({
            parentFolderId,
            title,
            color: "blue",
          });
        }}
      >
        <input
          value={parentFolderId}
          onChange={(e) => setParentFolderId(e.target.value)}
          placeholder="parent"
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        />
        <button type={"submit"}>save</button>
      </form>

      <h3>folders</h3>
      <br />
      {foldersResponse.data?.folders.map((e) => (
        // @ts-ignore
        <Folder key={e.folderId} folder={e} />
      ))}
    </div>
  );
};

export const Folder: React.FC<{ folder: FolderType }> = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      F - {props.folder.title}{" "}
      <button onClick={() => setExpanded((s) => !s)}>
        {expanded ? "v" : ">"}
      </button>
      {expanded && (
        <div className="ml-3">
          {props.folder.folders.map((e) => (
            <Folder key={e.folderId} folder={e} />
          ))}

          {props.folder.bookmarks.map((e) => (
            <div key={e.bookmarkId}>B - {e.title}</div>
          ))}
        </div>
      )}
    </div>
  );
};
