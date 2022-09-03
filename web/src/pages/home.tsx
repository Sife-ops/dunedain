import { useEffect } from "react";
import { Bookmarks } from "../component/bookmarks";
import { Categories } from "../component/categories";
import { useBookmarkFilter } from "../component/bookmark-search";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const bookmarkFilter = useBookmarkFilter();

  useEffect(() => {
    bookmarkFilter.bookmarks.searchDefault();
  }, []);

  return (
    <div>
      {/* <h3>Search</h3> */}
      <br />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          bookmarkFilter.bookmarks.search();
        }}
      >
        <input
          placeholder="filter"
          value={bookmarkFilter.input.search}
          onChange={(e) => bookmarkFilter.input.setSearch(e.target.value)}
        />
        <button type={"submit"}>search</button>

        {/* <h3>Categories</h3> */}

        {/* <button onClick={() => navigate("/category/new")}>New Category</button> */}
        <br />
        <br />

        <Categories
          categories={bookmarkFilter.categories.categories}
          toggleCategory={bookmarkFilter.categories.toggleCategory}
        />

        <select
          onChange={(e) => {
            // @ts-ignore
            bookmarkFilter.input.setCategoryOpt(e.target.value);
          }}
        >
          <option>And</option>
          <option>Or</option>
        </select>
      </form>

      <h3>Bookmarks</h3>

      <button onClick={() => navigate("/bookmark/new")}>New Bookmark</button>
      <br />
      <br />

      {bookmarkFilter.bookmarks.bookmarks === null ? (
        <div>loading...</div>
      ) : (
        <Bookmarks bookmarks={bookmarkFilter.bookmarks.bookmarks} />
      )}
    </div>
  );
};
