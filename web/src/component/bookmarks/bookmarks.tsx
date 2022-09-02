import React from "react";
import { Bookmark as BookmarkType } from "../../../../graphql/genql/schema";
import { useNavigate } from "react-router-dom";

export const Bookmarks: React.FC<{
  bookmarks: BookmarkType[];
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
        <Bookmark key={e.bookmarkId} bookmark={e} />
      ))}
    </div>
  );
};

const Bookmark: React.FC<{
  bookmark: BookmarkType;
}> = (props) => {
  const navigate = useNavigate();

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

      <button
        onClick={() => {
          navigate(`bookmark/${props.bookmark.bookmarkId}`);
        }}
      >
        Details
      </button>
    </div>
  );
};
