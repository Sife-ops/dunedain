import React from "react";
import { Bookmark as BookmarkType } from "../../../graphql/genql/schema";
import { BookmarkForm } from "../component/bookmark-form";
import { useBookmarkQuery } from "../query/bookmark";
import { useParams } from "react-router-dom";

export const BookmarkDetails: React.FC = () => {
  const { bookmarkId } = useParams();

  const [bookmarkState] = useBookmarkQuery(bookmarkId!);

  const { fetching, data, error } = bookmarkState;

  if (fetching) {
    return (
      <div>
        <div>loading...</div>
      </div>
    );
  }

  if (!data || error) {
    return (
      <div>
        <div>error</div>
      </div>
    );
  }

  const bookmark = data.bookmark as BookmarkType;

  return (
    <div>
      <h3>Edit Bookmark</h3>
      <BookmarkForm bookmark={bookmark} />
    </div>
  );
};
