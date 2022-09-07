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
  const { selectableCategories } = bookmarkForm.categories.selectableCategories;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const { title, url } = bookmarkForm.input;
        const categoryIds =
          bookmarkForm.categories.selectableCategories.selectableCategories
            ?.filter((e) => e.selected)
            .map((e) => e.categoryId) || [];

        if (props.bookmark) {
          bookmarkForm.operation.bookmarkEdit.mutation({
            input: {
              bookmarkId: props.bookmark.bookmarkId,
              categoryIds,
              title,
              url,
            },
          });
        } else {
          bookmarkForm.operation.bookmarkCreate.mutation({
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

      { selectableCategories && selectableCategories.length > 0 && (
        <div className="mb-1">
          <Text>Categories:</Text>
          <Categories
            useCategoriesResponse={
              bookmarkForm.categories.useCategoriesResponse
            }
            useSelectableCategories={
              bookmarkForm.categories.selectableCategories
            }
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
              bookmarkForm.operation.bookmarkDelete.mutation({
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
