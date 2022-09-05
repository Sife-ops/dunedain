import { Bookmarks } from "../component/bookmarks";
import { Button } from "@chakra-ui/react";
import { Categories } from "../component/categories";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useBookmarkFilter } from "../component/bookmark-search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const bookmarkFilter = useBookmarkFilter();

  const [showCategories, setShowCategories] = useState<boolean>(false);

  useEffect(() => {
    bookmarkFilter.bookmarks.searchDefault();
  }, []);

  return (
    <div>
      <div className="flex gap-1 mb-1">
        <Button
          colorScheme={"teal"}
          fontSize={"4xl"}
          onClick={() => navigate("/bookmark/new")}
          width={'64px'}
        >
          +
        </Button>
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

        <Button
          colorScheme={"teal"}
          variant={showCategories ? "outline" : "solid"}
          onClick={() => setShowCategories((s) => !s)}
        >
          Categories
        </Button>
      </div>

      {showCategories && (
        <Categories
          className="mb-1"
          categories={bookmarkFilter.categories.categories}
          toggleCategory={bookmarkFilter.categories.toggleCategory}
          filterProps={{
            resetCategories: bookmarkFilter.categories.resetCategories,
            search: bookmarkFilter.bookmarks.search,
            setCategoryOpt: bookmarkFilter.input.setCategoryOpt,
          }}
        />
      )}

      <Bookmarks bookmarks={bookmarkFilter.bookmarks.bookmarks} />
    </div>
  );
};
