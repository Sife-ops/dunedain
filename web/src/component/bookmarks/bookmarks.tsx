import React from "react";
import { Bookmark as BookmarkType } from "../../../../graphql/genql/schema";
import { BookmarkDelete } from "./bookmark-delete";
import { BookmarkForm } from "../bookmark-form";
import { SelectableCategory } from "../categories";

export const Bookmarks: React.FC<{
  bookmarks: BookmarkType[];
  categories: SelectableCategory[];
  setModalComponent: React.Dispatch<React.SetStateAction<JSX.Element>>;
  setModalMode: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  if (props.bookmarks.length < 1) {
    return (
      <div>
        <div>no bookmarks</div>
      </div>
    );
  }

  return (
    <div>
      {props.bookmarks.map((e) => (
        <Bookmark
          key={e.bookmarkId}
          bookmark={e}
          categories={props.categories}
          setModalComponent={props.setModalComponent}
          setModalMode={props.setModalMode}
        />
      ))}
    </div>
  );
};

const Bookmark: React.FC<{
  bookmark: BookmarkType;
  categories: SelectableCategory[];
  setModalComponent: React.Dispatch<React.SetStateAction<JSX.Element>>;
  setModalMode: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  return (
    <div
      key={props.bookmark.bookmarkId}
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>{props.bookmark.title}</div>
      <div>{props.bookmark.url}</div>

      <div>
        <button
          onClick={() => {
            props.setModalComponent(
              <div>
                <h3>Edit Bookmark</h3>
                <BookmarkForm
                  bookmark={props.bookmark}
                  categories={props.categories}
                  setEnabled={props.setModalMode}
                />
              </div>
            );
            props.setModalMode(true);
          }}
        >
          Edit
        </button>

        <button
          onClick={() => {
            props.setModalComponent(
              <div>
                <h3>Are you sure?</h3>
                <BookmarkDelete
                  bookmark={props.bookmark}
                  setModalMode={props.setModalMode}
                />
              </div>
            );
            props.setModalMode(true);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
