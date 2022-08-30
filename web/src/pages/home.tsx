import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBookmarksQuery } from "../query/bookmarks";
import { BookmarkForm } from "../component/bookmark-form";

export const Home = () => {
  const [bookmarksQueryState] = useBookmarksQuery();

  // useEffect(()=>{
  // }, [])

  if (bookmarksQueryState.fetching) {
    return (
      <div>
        <div>loading...</div>
      </div>
    );
  }

  if (bookmarksQueryState.error || !bookmarksQueryState.data) {
    return (
      <div>
        <div>Error...</div>
      </div>
    );
  }

  const { bookmarks } = bookmarksQueryState.data;

  return (
    <div>
      <h3>Home</h3>
      <BookmarkForm />
      <div>
        {bookmarks.map((e) => (
          <div key={e.bookmarkId}>
            <div>title: {e.title}</div>
            <div>url: {e.url}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
