import React from "react";
import { Bookmark as BookmarkType } from "@dunedain/graphql/genql/schema";
import { BookmarkForm } from "../bookmark-form";
import { Heading } from "@chakra-ui/react";
import { Loading } from "../loading";
import { useBookmarkQuery } from "../../query/bookmark";
import { useParams } from "react-router-dom";

export const BookmarkDetails: React.FC = () => {
  const { bookmarkId } = useParams();

  const [{ data }] = useBookmarkQuery(bookmarkId!);
  const bookmark = data?.bookmark as BookmarkType;

  return (
    <div>
      <Heading textAlign={"center"}>Edit Bookmark</Heading>
      <Loading data={bookmark}>
        <BookmarkForm bookmark={bookmark} />
      </Loading>
    </div>
  );
};
