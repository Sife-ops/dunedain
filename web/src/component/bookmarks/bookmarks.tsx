import "./style.css";
import React from "react";
import { Bookmark as BookmarkType } from "../../../../graphql/genql/schema";
import { useNavigate } from "react-router-dom";
import { TableContainer, Table, Tbody, Tr, Td } from "@chakra-ui/react";

export const Bookmarks: React.FC<{
  bookmarks: BookmarkType[] | null;
}> = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <TableContainer>
        <Table className="bookmarkTable">
          <Tbody>
            {props.bookmarks?.map((e) => (
              <Tr key={e.bookmarkId}>
                <Td>{e.title}</Td>
                <Td>{e.url}</Td>
                <Td width={"96px"}>
                  <button
                    onClick={() => {
                      navigate(`bookmark/${e.bookmarkId}`);
                    }}
                  >
                    Edit
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
