import React from "react";
import { Bookmark } from "../../../../graphql/genql/schema";
import { Button, Input, Text } from "@chakra-ui/react";
import { Categories } from "../categories";
import { useBookmarkForm } from "./use-bookmark-form";
import { useNavigate } from "react-router-dom";

export const BookmarkForm: React.FC<{
  bookmark?: Bookmark;
}> = (props) => {
  const navigate = useNavigate();

  const bookmarkForm = useBookmarkForm(props.bookmark);
  const {
    selectableCategories: { categories },
  } = bookmarkForm;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (props.bookmark) bookmarkForm.action.edit();
        else bookmarkForm.action.create();
      }}
    >
      <div className="mb-1">
        <Text>Title:</Text>
        <Input
          onChange={(e) => bookmarkForm.input.setTitle(e.target.value)}
          placeholder="title"
          value={bookmarkForm.input.title}
        />
      </div>

      <div className="mb-1">
        <Text>URL:</Text>
        <Input
          onChange={(e) => bookmarkForm.input.setUrl(e.target.value)}
          placeholder="url"
          value={bookmarkForm.input.url}
        />
      </div>

      {/* todo: loading spinner */}
      {categories && categories.length > 0 && (
        <div className="mb-1">
          <Text>Categories:</Text>
          <Categories
            selectableCategories={bookmarkForm.selectableCategories}
          />
        </div>
      )}

      <div className="flex justify-between">
        <div className="flex gap-1">
          <Button
            colorScheme={"teal"}
            type={"submit"}
            disabled={!bookmarkForm.input.isValidForm}
          >
            {props.bookmark ? "Save" : "Submit"}
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
        {props.bookmark && (
          <Button
            colorScheme={"red"}
            onClick={(e) => {
              e.preventDefault();
              bookmarkForm.action.delete();
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </form>
  );
};
