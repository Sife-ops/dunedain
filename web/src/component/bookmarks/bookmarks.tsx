import "./style.css";
import React from "react";
import { BiCog } from "react-icons/bi";
import { Bookmark as BookmarkType } from "@dunedain/graphql/genql/schema";
import { TableContainer, Table, Tbody, Tr, Td } from "@chakra-ui/react";
import { useBreakpoint } from "../../hook/breakpoint";
import { useNavigate } from "react-router-dom";

export const Bookmarks: React.FC<{
  bookmarks: BookmarkType[] | null;
}> = (props) => {
  const { isDesktop } = useBreakpoint();

  const navigate = useNavigate();

  return (
    <TableContainer>
      <Table className="bookmarkTable">
        <Tbody>
          {props.bookmarks?.map((e) => (
            <Tr key={e.bookmarkId}>
              <Td>{e.title}</Td>
              {isDesktop && <Td>{e.url}</Td>}
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
