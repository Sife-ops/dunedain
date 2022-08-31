import { Bookmark } from "../../../graphql/genql/schema";
import { BookmarkForm } from "../component/bookmark-form";
import { CategoryForm } from "../component/category-form";
import { useBookmarkDeleteMutation } from "../query/bookmark-delete";
import { useBookmarksQuery } from "../query/bookmarks";
import { useCategories, Categories } from "../component/categories";
import { useCategoriesQuery } from "../query/categories";
import { useEffect, useState } from "react";

export const Home = () => {
  const [categoriesQueryState] = useCategoriesQuery();
  const { categories, toggleCategory, updateCategories } = useCategories();

  const [bookmarksQueryState] = useBookmarksQuery();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const [_, bookmarkDelete] = useBookmarkDeleteMutation();

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
      <div>
        <h3>Categories</h3>
        <button onClick={() => setCreateCategoryMode(true)}>
          New Category
        </button>
        <button onClick={() => {}}>Edit Categories</button>
        <Categories categories={categories} toggleCategory={toggleCategory} />

        <h3>Bookmarks</h3>
        <button onClick={() => setCreateBookmarkMode(true)}>
          New Bookmark
        </button>
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
            <div>{e.title}</div>
            <div>{e.url}</div>
            <div>
              <button
                onClick={() => {
                  setModalComponent(
                    <div>
                      <h3>Edit Bookmark</h3>
                      <BookmarkForm
                        bookmark={e}
                        categories={categories}
                        setEnabled={setModalMode}
                      />
                    </div>
                  );
                  setModalMode(true);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setModalComponent(
                    <div>
                      <h3>Are you sure?</h3>
                      <button
                        onClick={() => {
                          // todo: re-exec bookmarksQuery
                          bookmarkDelete({
                            bookmarkId: e.bookmarkId,
                          });
                          setModalMode(false);
                        }}
                      >
                        Yes
                      </button>
                      <button onClick={() => setModalMode(false)}>No</button>
                    </div>
                  );
                  setModalMode(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
