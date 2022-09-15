import { Folder as FolderType } from "@dunedain/graphql/genql/schema";
import { ThemeTypings } from "@chakra-ui/react";
import { useFolderCreateMutation } from "../query/folder-create";
import { useFolderDeleteMutation } from "../query/folder-delete";
import { useFolderEditMutation } from "../query/folder-edit";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const useFolderForm = (folder?: FolderType) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<ThemeTypings["colorSchemes"]>("blue");

  const [folderCreateState, folderCreate] = useFolderCreateMutation();
  const [folderDeleteState, folderDelete] = useFolderDeleteMutation();
  const [folderEditState, folderEdit] = useFolderEditMutation();

  useEffect(() => {
    const { fetching, data, error } = folderCreateState;
    if (!fetching && !error && data) {
      navigate(-1);
    }
  }, [folderCreateState.data]);

  useEffect(() => {
    const { fetching, data, error } = folderEditState;
    if (!fetching && !error && data) {
      navigate(-1);
    }
  }, [folderEditState.data]);

  useEffect(() => {
    const { fetching, data, error } = folderDeleteState;
    if (!fetching && !error && data) {
      navigate(-1);
    }
  }, [folderDeleteState.data]);

  useEffect(() => {
    if (folder) {
      setTitle(folder.title);
      setColor(folder.color);
    }
  }, []);

  const create = () => {
    folderCreate({
      color,
      parentFolderId: "",
      title,
    });
  };

  const edit = () => {
    if (folder) {
      folderEdit({
        color,
        folderId: folder.folderId,
        parentFolderId: "",
        title,
      });
    }
  };

  const delete_ = () => {
    if (folder) {
      folderDelete({
        folderId: folder.folderId,
      });
    }
  };

  return {
    state: {
      title,
      color,

      folderCreateState,
      folderDeleteState,
      folderEditState,
    },
    action: {
      create,
      edit,
      delete: delete_,
    },
    set: {
      setTitle,
      setColor,
    },
  };
};
