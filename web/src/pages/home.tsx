import { BiCog } from "react-icons/bi";
import { BsFillGridFill } from "react-icons/bs";
import { Categories } from "../component/categories";
import { HiPlus } from "react-icons/hi";
import { Loading } from "../component/loading";
import { useBookmarkFilter } from "../component/bookmark-search";
import { useBreakpoint } from "../hook/breakpoint";
import { useNavigate } from "react-router-dom";

import {
  Button,
  ButtonGroup,
  Input,
  Select,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";

export const Home = () => {
  const { isDesktop } = useBreakpoint();
  const navigate = useNavigate();

  const bookmarkFilter = useBookmarkFilter();
  const [bookmarkSearchState] = bookmarkFilter.mutation.bookmarkSearchMutation;

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
          variant={bookmarkFilter.input.showCategories ? "outline" : "solid"}
          onClick={() => bookmarkFilter.input.setShowCategories((s) => !s)}
          w={"64px"}
          minW={"64px"}
        >
          <BsFillGridFill size={32} />
        </Button>
      </div>

      {bookmarkFilter.input.showCategories && (
        <>
          <Categories
            buttonNew
            className="mb-1"
            selectableCategories={bookmarkFilter.selectableCategories}
          />

          <div className="flex gap-1 mb-1">
            <ButtonGroup variant={"solid"} isAttached>
              <Button
                className="grow"
                colorScheme={"teal"}
                onClick={(e) => {
                  bookmarkFilter.mutation.search();
                }}
              >
                Filter
              </Button>

              <Button
                className="grow"
                colorScheme={"gray"}
                onClick={() => {
                  bookmarkFilter.selectableCategories.resetCategories();
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
                bookmarkFilter.mutation.search({ categoryOpt });
              }}
            >
              <option>And</option>
              <option>Or</option>
            </Select>
          </div>
        </>
      )}

      <Loading data={bookmarkFilter.bookmarks}>
        <TableContainer>
          {bookmarkFilter.bookmarks && bookmarkSearchState.fetching ? (
            <>
              {bookmarkFilter.bookmarks?.map(() => (
                // todo: hardcoded height no good
                <Skeleton marginBottom={"5px"} height={"50.5px"} />
              ))}
            </>
          ) : (
            <Table className="bookmarkTable">
              <Tbody>
                {bookmarkFilter.bookmarks?.map((e) => (
                  <Tr key={e.bookmarkId}>
                    <Td>
                      <a href={e.url} target="_blank">
                        {e.title}
                      </a>
                    </Td>
                    {isDesktop && (
                      <Td>
                        <a href={e.url} target="_blank">
                          {e.url}
                        </a>
                      </Td>
                    )}
                    <Td width={"64px"}>
                      <button
                        onClick={() => {
                          navigate(`/bookmark/${e.bookmarkId}`);
                        }}
                      >
                        <BiCog />
                      </button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </TableContainer>
      </Loading>
    </div>
  );
};
