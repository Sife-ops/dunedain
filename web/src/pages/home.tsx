import { Bookmarks } from "../component/bookmarks";
import { Button } from "@chakra-ui/react";
import { Categories } from "../component/categories";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
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

      <button
        onClick={() => {
          bookmarkFilter.bookmarks.search();
        }}
      >
        filter
      </button>

      <button
        onClick={(e) => {
          bookmarkFilter.categories.resetCategories();
        }}
      >
        Reset
      </button>

      <br />
      <br />

      <div className="flex gap-1">
        <Button colorScheme={'green'} onClick={() => navigate("/bookmark/new")}>New</Button>
        <Input
          onChange={(e) => bookmarkFilter.input.setFilter(e.target.value)}
          placeholder="filter"
          value={bookmarkFilter.input.filter}
        />

        <Select
          w={"96px"}
          onChange={(e) => {
            const filterOpt = e.target.value as "title" | "URL" | "both";
            bookmarkFilter.input.setFilterOpt(filterOpt);
          }}
        >
          <option>title</option>
          <option>URL</option>
          <option>both</option>
        </Select>
      </div>

      <Bookmarks bookmarks={bookmarkFilter.bookmarks.bookmarks} />
    </div>
  );
};
