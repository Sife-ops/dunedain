import React from "react";
import { useBookmarksQuery } from "../../query/bookmarks";
import { Bookmark as BookmarkType } from "../../../../graphql/genql/schema";
import { useNavigate } from "react-router-dom";

export const Bookmarks: React.FC = () => {
  const [bookmarksQueryState] = useBookmarksQuery();

  const { fetching, data, error } = bookmarksQueryState;

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

  const bookmarks = data.bookmarks as BookmarkType[];

  if (bookmarks.length < 1) {
    return (
      <div>
        <div>no bookmarks</div>
      </div>
    );
  }

  return (
    <div>
      {bookmarks.map((e) => (
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
          // props.setModalComponent(
          //   <div>
          //     <h3>Edit Bookmark</h3>
          //     <BookmarkForm
          //       bookmark={props.bookmark}
          //       categories={props.categories}
          //       setEnabled={props.setModalMode}
          //     />
          //   </div>
          // );
          // props.setModalMode(true);
        }}
      >
        Details
      </button>

      {/* <button
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
        </button> */}
    </div>
  );
};
