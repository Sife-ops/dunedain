import React from "react";
import { Button, Input, Text, Select } from "@chakra-ui/react";
import { Folder as FolderType } from "@dunedain/graphql/genql/schema";
// import { useCategoryForm } from "../hook/category-form";
import { useNavigate } from "react-router-dom";

export const FolderForm: React.FC<{
  folder?: FolderType;
}> = (props) => {
  const navigate = useNavigate();

  //   const categoryForm = useCategoryForm(props.category);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (props.folder) {
          //   categoryForm.action.edit();
        } else {
          //   categoryForm.action.create();
        }
      }}
    >
      <div className="mb-1">
        <Text>Title:</Text>
        <Input
          //   onChange={(e) => categoryForm.set.setTitle(e.target.value)}
          placeholder="title"
          //   value={categoryForm.state.title}
        />
      </div>

      <div className="mb-1">
        <Text>Color:</Text>
        <Select
          marginBottom={"1"}
          //   onChange={(e) => categoryForm.set.setColor(e.target.value)}
          //   value={categoryForm.state.color}
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
            // disabled={categoryForm.state.title.length < 1}
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
              //   categoryForm.action.delete();
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
