import { Bookmarks } from "../component/bookmarks";
import { Categories } from "../component/categories";
import { useBookmarkFilter } from "../component/bookmark-search";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const bookmarkFilter = useBookmarkFilter();

  useEffect(() => {
    bookmarkFilter.bookmarks.searchDefault();
  }, []);

  return (
    <div>
      <input
        placeholder="filter"
        value={bookmarkFilter.input.filter}
        onChange={(e) => bookmarkFilter.input.setFilter(e.target.value)}
      />

      <select
        onChange={(e) => {
          const filterOpt = e.target.value as "title" | "URL" | "both";
          bookmarkFilter.input.setFilterOpt(filterOpt);
        }}
      >
        <option>title</option>
        <option>URL</option>
        <option>both</option>
      </select>

      <br />
      <br />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          bookmarkFilter.bookmarks.search();
        }}
      >
        <Categories
          categories={bookmarkFilter.categories.categories}
          toggleCategory={bookmarkFilter.categories.toggleCategory}
        />

        <select
          onChange={(e) => {
            const categoryOpt = e.target.value as "And" | "Or";
            bookmarkFilter.input.setCategoryOpt(categoryOpt);
            bookmarkFilter.bookmarks.search({ categoryOpt });
          }}
        >
          <option>And</option>
          <option>Or</option>
        </select>

        <button type={"submit"}>filter</button>

        <button
          onClick={(e) => {
            e.preventDefault();
            bookmarkFilter.categories.resetCategories();
          }}
        >
          Reset
        </button>
      </form>

      <br />

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
