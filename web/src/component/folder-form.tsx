import React from "react";
import { Button, Input, Text, Select } from "@chakra-ui/react";
import { Folder as FolderType } from "@dunedain/graphql/genql/schema";
import { useFolderForm } from "../hook/folder-form";
import { useNavigate } from "react-router-dom";

export const FolderForm: React.FC<{
  folder?: FolderType;
}> = (props) => {
  const navigate = useNavigate();

  const folderForm = useFolderForm(props.folder);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (props.folder) {
          folderForm.action.edit();
        } else {
          folderForm.action.create();
        }
      }}
    >
      <div className="mb-1">
        <Text>Title:</Text>
        <Input
          onChange={(e) => folderForm.set.setTitle(e.target.value)}
          placeholder="title"
          value={folderForm.state.title}
        />
      </div>

      <div className="mb-1">
        <Text>Color:</Text>
        <Select
          marginBottom={"1"}
          onChange={(e) => folderForm.set.setColor(e.target.value)}
          value={folderForm.state.color}
        >
          {colors.map((e) => (
            <option key={e}>{e}</option>
          ))}
        </Select>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-1">
          <Button
            colorScheme={"teal"}
            type={"submit"}
            disabled={folderForm.state.title.length < 1}
          >
            {/* todo: doesn't trigger refetch */}
            {props.folder ? "Save" : "Submit"}
          </Button>

          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </Button>
        </div>

        {/* todo: confirm delete */}
        {props.folder && (
          <Button
            colorScheme={"red"}
            onClick={(e) => {
              e.preventDefault();
              folderForm.action.delete();
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </form>
  );
};

// todo: duplicated from category-form.tsx
const colors = [
  "whiteAlpha",
  "blackAlpha",
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
  "linkedin",
  "facebook",
  "messenger",
  "whatsapp",
  "twitter",
  "telegram",
];
