import { BookmarkForm } from "../component/bookmark-form";
import { Bookmark } from "../../../graphql/genql/schema";
import { useBookmarksQuery } from "../query/bookmarks";
import { useCategoriesQuery } from "../query/categories";
import { useEffect, useState } from "react";
import { useCategories, Categories } from "../component/categories";

export const Home = () => {
  const [categoriesQueryState] = useCategoriesQuery();
  const { categories, toggleCategory, updateCategories } = useCategories();

  const [bookmarksQueryState] = useBookmarksQuery();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const [createMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editComponent, setEditComponent] = useState<JSX.Element>(<></>);

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
      console.log("set bookmarks");
      // @ts-ignore
      setBookmarks(data.bookmarks);
    }
  }, [bookmarksQueryState.data]);

  if (createMode) {
    return (
      <div>
        <h3>New Bookmark</h3>
        <BookmarkForm
          categories={categories}
          setEnabled={setCreateMode}
          type={"create"}
        />
      </div>
    );
  }

  if (editMode) {
    return editComponent;
  }

  return (
    <div>
      <div>
        <h3>Categories</h3>
        <button onClick={() => {}}>New Category</button>
        <button onClick={() => {}}>Edit Categories</button>
        <Categories categories={categories} toggleCategory={toggleCategory} />

        <h3>Bookmarks</h3>
        <button onClick={() => setCreateMode(true)}>New Bookmark</button>
        <br />
        <br />

        {bookmarks.map((e) => (
          <div
            key={e.bookmarkId}
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* <div>
              <div>title: {e.title}</div>
              <div>url: {e.url}</div>
            </div> */}
            <div>{e.title}</div>
            <div>{e.url}</div>
            <div>
              <button
                onClick={() => {
                  setEditComponent(
                    <div>
                      <h3>Edit Bookmark</h3>
                      <BookmarkForm
                        bookmark={e}
                        categories={categories}
                        setEnabled={setEditMode}
                        type={"edit"}
                      />
                    </div>
                  );
                  setEditMode(true);
                }}
              >
                Edit
              </button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
