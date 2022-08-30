import { BookmarkForm } from "../component/bookmark-form";
import { Category } from "../../../graphql/genql/schema";
import { useBookmarksQuery } from "../query/bookmarks";
import { useCategoriesQuery } from "../query/categories";
import { useEffect, useState } from "react";
import { useCategories, Categories } from "../component/categories";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  // const navigate = useNavigate();
  // const [bookmarksQueryState] = useBookmarksQuery();

  const [categoriesQueryState] = useCategoriesQuery();

  const [createMode, setCreateMode] = useState(false);

  const { categories, toggleCategory, updateCategories } = useCategories();

  useEffect(() => {
    const { fetching, data } = categoriesQueryState;
    if (!fetching && data) {
      // @ts-ignore
      updateCategories(data.categories);
    }
  }, [categoriesQueryState.fetching]);

  // const { bookmarks } = bookmarksQueryState.data;

  return (
    <div>
      {!createMode && (
        <div>
          <h3>Categories</h3>
          <Categories categories={categories} toggleCategory={toggleCategory} />

          <h3>Bookmarks</h3>
          <button onClick={() => setCreateMode(true)}>New Bookmark</button>

          {/* {bookmarks && bookmarks.map((e) => (
            <div key={e.bookmarkId}>
              <div>title: {e.title}</div>
              <div>url: {e.url}</div>
            </div>
          ))} */}
        </div>
      )}
      {createMode && (
        <div>
          <h3>New Bookmark</h3>
          <BookmarkForm />
          <button onClick={() => setCreateMode(false)}>cancel</button>
        </div>
      )}
    </div>
  );
};
