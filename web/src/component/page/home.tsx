import Logo from "../../assets/favicon.svg";
import { BiCog } from "react-icons/bi";
import { BsFillGridFill } from "react-icons/bs";
import { Categories } from "../categories";
import { HiPlus } from "react-icons/hi";
import { Loading } from "../loading";
import { useBreakpoint } from "../../hook/breakpoint";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../hook/global-context";

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
  const navigate = useNavigate();
  const { isDesktop } = useBreakpoint();

  const {
    bookmarksFilter,
    bookmarksFilter: {
      bookmarkSearchMutation: [bookmarkSearchState],
    },
  } = useGlobalContext();

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
          onChange={(e) => bookmarksFilter.input.setFilter(e.target.value)}
          placeholder="filter"
          value={bookmarksFilter.input.filter}
        />

        <Select
          w={"96px"}
          minW={"96px"}
          onChange={(e) => {
            const filterOpt = e.target.value as "title" | "URL" | "both";
            bookmarksFilter.input.setFilterOpt(filterOpt);
          }}
        >
          <option>title</option>
          <option>URL</option>
          <option>both</option>
        </Select>

        <Button
          colorScheme={"teal"}
          variant={bookmarksFilter.input.showCategories ? "outline" : "solid"}
          onClick={() => bookmarksFilter.input.setShowCategories((s) => !s)}
          w={"64px"}
          minW={"64px"}
        >
          <BsFillGridFill size={32} />
        </Button>
      </div>

      {bookmarksFilter.input.showCategories && (
        <>
          <Categories
            buttonNew
            className="mb-1"
            selectableCategories={bookmarksFilter.selectableCategories}
          />

          <div className="flex gap-1 mb-1">
            <ButtonGroup variant={"solid"} isAttached>
              <Button
                className="grow"
                colorScheme={"teal"}
                onClick={(e) => {
                  bookmarksFilter.action.search();
                }}
              >
                Filter
              </Button>

              <Button
                className="grow"
                colorScheme={"gray"}
                onClick={() => {
                  bookmarksFilter.selectableCategories.resetCategories();
                }}
              >
                Reset
              </Button>
            </ButtonGroup>

            <Select
              w={"96px"}
              minW={"96px"}
              value={bookmarksFilter.input.categoryOpt}
              onChange={(e) => {
                const categoryOpt = e.target.value as "And" | "Or";
                bookmarksFilter.input.setCategoryOpt(categoryOpt);
                bookmarksFilter.action.search({ categoryOpt });
              }}
            >
              <option>And</option>
              <option>Or</option>
            </Select>
          </div>
        </>
      )}

      <Loading data={bookmarksFilter.bookmarks}>
        <TableContainer>
          {bookmarksFilter.bookmarks && bookmarkSearchState.fetching ? (
            <>
              {bookmarksFilter.bookmarks?.map((e) => (
                // todo: hardcoded height no good
                <Skeleton
                  key={e.bookmarkId}
                  marginBottom={"5px"}
                  height={"50.5px"}
                />
              ))}
            </>
          ) : (
            <Table className="bookmarkTable">
              <Tbody>
                {bookmarksFilter.bookmarks?.map((e) => (
                  <Tr key={e.bookmarkId}>
                    <Td>
                      <div className="flex items-center">
                        <img
                          src={(() => {
                            if (e.favicon) {
                              return `data:image/png;base64,${e.favicon}`;
                            } else {
                              return Logo;
                            }
                          })()}
                          className="w-[16px] h-[16px] mr-2"
                        />
                        <a href={e.url} target="_blank">
                          {e.title}
                        </a>
                      </div>
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
