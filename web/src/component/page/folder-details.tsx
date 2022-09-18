import React from "react";
import { Folder } from "../../../../graphql/genql/schema";
import { FolderForm } from "../../component/folder-form";
import { Heading } from "@chakra-ui/react";
import { Loading } from "../../component/loading";
import { useFolderQuery } from "../../query/folder";
import { useParams } from "react-router-dom";

export const FolderDetails: React.FC = () => {
  const { folderId } = useParams();

  const [{ data }] = useFolderQuery(folderId!);
  const folder = data?.folder as Folder;

  return (
    <div>
      <Heading textAlign={"center"}>Edit Folder</Heading>
      <Loading data={folder}>
        <FolderForm folder={folder} />
      </Loading>
    </div>
  );
};
