import "./style.css";
import React from "react";
import { BiCog } from "react-icons/bi";
import { Bookmark as BookmarkType } from "@dunedain/graphql/genql/schema";
import { useBreakpoint } from "../../hook/breakpoint";
import { useNavigate } from "react-router-dom";

import {
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

export const Bookmarks: React.FC<{
  bookmarks: BookmarkType[] | null;
  fetching: boolean;
}> = (props) => {
  const { isDesktop } = useBreakpoint();

  const navigate = useNavigate();

  if (props.fetching) {
    return (
      <Stack>
        {(() => {
          let a = [];
          for (let i = 0; i < 14; i++) {
            a.push(<Skeleton height={"50"} />);
          }
          return a;
        })()}
      </Stack>
    );
  }

  return (
    <TableContainer>
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
    </TableContainer>
  );
};
