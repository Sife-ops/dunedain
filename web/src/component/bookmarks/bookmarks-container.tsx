import { Bookmark as BookmarkType } from "../../../../graphql/genql/schema";
import { Bookmarks } from "./bookmarks";
import { useBookmarksQuery } from "../../query/bookmarks";

export const BookmarksContainer = () => {
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

  return <Bookmarks bookmarks={bookmarks} />;
};
