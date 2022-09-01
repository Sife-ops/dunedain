import { Bookmark } from "../../../graphql/genql/schema";
import { BookmarkForm } from "../component/bookmark-form";
import { Bookmarks } from "../component/bookmarks";
import { CategoryForm } from "../component/category-form";
import { useCategories, Categories } from "../component/categories";
import { useCategoriesQuery } from "../query/categories";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  // const [categoriesQueryState] = useCategoriesQuery();
  const { categories, toggleCategory, updateCategories } = useCategories();

  // const [bookmarkCreateMode, setBookmarkCreateMode] = useState(false);
  // const [categoryCreateMode, setCategoryCreateMode] = useState(false);
  // const [categoryEditMode, setCategoryEditMode] = useState(false);

  // const [modalMode, setModalMode] = useState(false);
  // const [modalComponent, setModalComponent] = useState<JSX.Element>(<></>);

  // useEffect(() => {
  //   const { fetching, data } = categoriesQueryState;
  //   if (!fetching && data) {
  //     // @ts-ignore
  //     updateCategories(data.categories);
  //   }
  // }, [categoriesQueryState.data]);

  // useEffect(() => {
  //   const { fetching, data } = bookmarksQueryState;
  //   if (!fetching && data) {
  //     // @ts-ignore
  //     setBookmarks(data.bookmarks);
  //   }
  // }, [bookmarksQueryState.data]);

  return (
    <div>
      <h3>Categories</h3>

      {/* {categoryEditMode ? (
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
      <br /> */}

      <Categories categories={categories} toggleCategory={toggleCategory} />

      <h3>Bookmarks</h3>
      <button onClick={() => navigate("bookmark/new")}>New Bookmark</button>
      <br />
      <br />

      <Bookmarks
        // bookmarks={data.bookmarks}
        // categories={categories}
        // setModalComponent={setModalComponent}
        // setModalMode={setModalMode}
      />
    </div>
  );
};
