import React from "react";
import { Bookmark } from "../../../../graphql/genql/schema";
import { useNavigate } from "react-router-dom";

export const Bookmarks: React.FC<{
  bookmarks: Bookmark[] | null;
}> = (props) => {
  if (props.bookmarks === null) {
    return (
      <div>
        <div>loading...</div>
      </div>
    );
  }

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
  bookmark: Bookmark;
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
