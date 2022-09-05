import React from "react";
import { BookmarkForm } from "../component/bookmark-form";
import { Heading } from '@chakra-ui/react'

export const BookmarkNew: React.FC = () => {
  return (
    <div>
      <Heading>New Bookmark</Heading>
      <BookmarkForm />
    </div>
  );
};
