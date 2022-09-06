import "./style.css";
import React from "react";
import { BiCog } from "react-icons/bi";
import { Bookmark as BookmarkType } from "@dunedain/graphql/genql/schema";
import { useBreakpoint } from "../../hook/breakpoint";
import { useNavigate } from "react-router-dom";
import { UseBookmarkSearchMutation } from "../../query/bookmark-search";
import { Loading } from "../loading";

import {
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Skeleton,
} from "@chakra-ui/react";

export const Bookmarks: React.FC<{
  bookmarks: BookmarkType[] | undefined;
  useBookmarkSearchMutation: UseBookmarkSearchMutation;
}> = (props) => {
  const navigate = useNavigate();

  const { isDesktop } = useBreakpoint();
  const [{ fetching, data }] = props.useBookmarkSearchMutation;

  // todo: 'no bookmarks' condition
  return (
    <Loading data={props.bookmarks}>
      <TableContainer>
        {props.bookmarks && fetching ? (
          <>
            {props.bookmarks?.map(() => (
              // todo: hardcoded height no good
              <Skeleton marginBottom={"5px"} height={"50.5px"} />
            ))}
          </>
        ) : (
          <Table className="bookmarkTable">
            <Tbody>
              {props.bookmarks?.map((e) => (
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
                        navigate(`bookmark/${e.bookmarkId}`);
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
  );
};
