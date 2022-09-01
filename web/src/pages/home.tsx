import { Bookmark } from "../../../graphql/genql/schema";
import { BookmarkForm } from "../component/bookmark-form";
import { Bookmarks } from "../component/bookmarks";
import { CategoryForm } from "../component/category-form";
import { useBookmarksQuery } from "../query/bookmarks";
import { useCategories, Categories } from "../component/categories";
import { useCategoriesQuery } from "../query/categories";
import { useEffect, useState } from "react";

export const Home = () => {
  const [categoriesQueryState] = useCategoriesQuery();
  const { categories, toggleCategory, updateCategories } = useCategories();

  const [bookmarksQueryState] = useBookmarksQuery();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const [bookmarkCreateMode, setBookmarkCreateMode] = useState(false);
  const [categoryCreateMode, setCategoryCreateMode] = useState(false);
  const [categoryEditMode, setCategoryEditMode] = useState(false);

  const [modalMode, setModalMode] = useState(false);
  const [modalComponent, setModalComponent] = useState<JSX.Element>(<></>);

  useEffect(() => {
    const { fetching, data } = categoriesQueryState;
    if (!fetching && data) {
      // @ts-ignore
      updateCategories(data.categories);
    }
  }, [categoriesQueryState.data]);

  useEffect(() => {
    const { fetching, data } = bookmarksQueryState;
    if (!fetching && data) {
      // @ts-ignore
      setBookmarks(data.bookmarks);
    }
  }, [bookmarksQueryState.data]);

  if (modalMode) {
    return modalComponent;
  }

  if (bookmarkCreateMode) {
    return (
      <div>
        <h3>New Bookmark</h3>
        <BookmarkForm
          categories={categories}
          setEnabled={setBookmarkCreateMode}
        />
      </div>
    );
  }

  if (categoryCreateMode) {
    return (
      <div>
        <h3>New Category</h3>
        <CategoryForm setEnabled={setCategoryCreateMode} />
      </div>
    );
  }

  return (
    <div>
      <h3>Categories</h3>
      {categoryEditMode ? (
        <div>
          <button onClick={() => setCategoryEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setCategoryCreateMode(true)}>
            New Category
          </button>
          <button onClick={() => setCategoryEditMode(true)}>
            Edit Categories
          </button>
        </div>
      )}
      <br />

      <Categories
        categories={categories}
        categoryEditMode={categoryEditMode}
        setModalComponent={setModalComponent}
        setModalMode={setModalMode}
        toggleCategory={toggleCategory}
      />

      <h3>Bookmarks</h3>
      <button onClick={() => setBookmarkCreateMode(true)}>New Bookmark</button>
      <br />
      <br />

      <Bookmarks
        bookmarks={bookmarks}
        categories={categories}
        setModalComponent={setModalComponent}
        setModalMode={setModalMode}
      />
    </div>
  );
};
