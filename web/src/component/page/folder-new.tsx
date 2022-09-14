import React from "react";
import { FolderForm } from "../../component/folder-form";
import { Heading } from "@chakra-ui/react";

export const FolderNew: React.FC = () => {
  return (
    <div>
      <Heading textAlign={"center"}>New Folder</Heading>
      <FolderForm />
    </div>
  );
};
