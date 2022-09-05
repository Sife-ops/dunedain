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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const { title, url } = bookmarkForm.state;
        const categoryIds =
          bookmarkForm.state.categories
            ?.filter((e) => e.selected)
            .map((e) => e.categoryId) || [];

        if (props.bookmark) {
          bookmarkForm.mutation.bookmarkEdit({
            input: {
              bookmarkId: props.bookmark.bookmarkId,
              categoryIds,
              title,
              url,
            },
          });
        } else {
          bookmarkForm.mutation.bookmarkCreate({
            input: {
              categoryIds,
              title,
              url,
            },
          });
        }
      }}
    >
      <div className="mb-1">
        <Text>Title:</Text>
        <Input
          onChange={(e) => bookmarkForm.set.setTitle(e.target.value)}
          placeholder="title"
          value={bookmarkForm.state.title}
        />
      </div>

      <div className="mb-1">
        <Text>URL:</Text>
        <Input
          onChange={(e) => bookmarkForm.set.setUrl(e.target.value)}
          placeholder="url"
          value={bookmarkForm.state.url}
        />
      </div>

      <div className="mb-1">
        <Text>Categories:</Text>
        <Categories
          categories={bookmarkForm.state.categories}
          toggleCategory={bookmarkForm.set.toggleCategory}
        />
      </div>

      <div className="flex justify-between">
        <div className="flex gap-1">
          <Button
            colorScheme={"teal"}
            type={"submit"}
            disabled={!bookmarkForm.state.isValidForm}
          >
            {props.bookmark ? "Save" : "Submit"}
          </Button>

          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
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
              bookmarkForm.mutation.bookmarkDelete({
                bookmarkId: props.bookmark!.bookmarkId,
              });
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </form>
  );
};
