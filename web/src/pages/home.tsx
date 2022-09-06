import { Bookmarks } from "../component/bookmarks";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Categories } from "../component/categories";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useBookmarkFilter } from "../component/bookmark-search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillGridFill } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";

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
          w={"64px"}
          minW={"64px"}
        >
          <HiPlus size={32} />
        </Button>

        <Input
          onChange={(e) => bookmarkFilter.input.setFilter(e.target.value)}
          placeholder="filter"
          value={bookmarkFilter.input.filter}
        />

        <Select
          w={"96px"}
          minW={"96px"}
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
          w={"64px"}
          minW={"64px"}
        >
          <BsFillGridFill size={32} />
        </Button>
      </div>

      {showCategories && (
        <>
          <Categories
            buttonNew
            className="mb-1"
            useCategoriesResponse={
              bookmarkFilter.categories.useCategoriesResponse
            }
            useSelectableCategories={
              bookmarkFilter.categories.useSelectableCategories
            }
          />

          <div className="flex gap-1 mb-1">
            <ButtonGroup variant={"solid"} isAttached>
              <Button
                className="grow"
                colorScheme={"teal"}
                onClick={(e) => {
                  bookmarkFilter.bookmarks.search();
                }}
              >
                Filter
              </Button>

              <Button
                className="grow"
                colorScheme={"gray"}
                onClick={(e) => {
                  bookmarkFilter.categories.useSelectableCategories.resetCategories();
                }}
              >
                Reset
              </Button>
            </ButtonGroup>

            <Select
              w={"96px"}
              minW={"96px"}
              onChange={(e) => {
                const categoryOpt = e.target.value as "And" | "Or";
                bookmarkFilter.input.setCategoryOpt(categoryOpt);
                bookmarkFilter.bookmarks.search({ categoryOpt });
              }}
            >
              <option>And</option>
              <option>Or</option>
            </Select>
          </div>
        </>
      )}

      <Bookmarks
        bookmarks={bookmarkFilter.bookmarks.bookmarks}
        fetching={bookmarkFilter.bookmarks.bookmarkSearchState.fetching}
      />
    </div>
  );
};
