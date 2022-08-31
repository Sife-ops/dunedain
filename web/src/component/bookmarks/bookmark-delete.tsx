import React, { useEffect } from "react";
import { useBookmarkDeleteMutation } from "../../query/bookmark-delete";
import { Bookmark as BookmarkType } from "../../../../graphql/genql/schema";

export const BookmarkDelete: React.FC<{
  bookmark: BookmarkType;
  setModalMode: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const [bookmarkDeleteState, bookmarkDelete] = useBookmarkDeleteMutation();

  useEffect(() => {
    const { fetching, data } = bookmarkDeleteState;
    if (!fetching && data) {
      props.setModalMode(false);
    }
  }, [bookmarkDeleteState.data]);

  return (
    <div>
      <button
        onClick={() => {
          bookmarkDelete({
            bookmarkId: props.bookmark.bookmarkId,
          });
        }}
      >
        Yes
      </button>
      <button onClick={() => props.setModalMode(false)}>No</button>
    </div>
  );
};
