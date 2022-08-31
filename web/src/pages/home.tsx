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

  const [createBookmarkMode, setCreateBookmarkMode] = useState(false);
  const [createCategoryMode, setCreateCategoryMode] = useState(false);
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

  if (createBookmarkMode) {
    return (
      <div>
        <h3>New Bookmark</h3>
        <BookmarkForm
          categories={categories}
          setEnabled={setCreateBookmarkMode}
        />
      </div>
    );
  }

  if (createCategoryMode) {
    return (
      <div>
        <h3>New Category</h3>
        <CategoryForm setEnabled={setCreateCategoryMode} />
      </div>
    );
  }

  return (
    <div>
      <h3>Categories</h3>
      <button onClick={() => setCreateCategoryMode(true)}>New Category</button>
      <button onClick={() => {}}>Edit Categories</button>
      <Categories categories={categories} toggleCategory={toggleCategory} />

      <h3>Bookmarks</h3>
      <button onClick={() => setCreateBookmarkMode(true)}>New Bookmark</button>
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
