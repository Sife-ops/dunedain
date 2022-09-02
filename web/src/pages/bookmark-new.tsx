import React from "react";
import { BookmarkForm } from "../component/bookmark-form";

export const BookmarkNew: React.FC = () => {
  return (
    <div>
      <h3>New Bookmark</h3>
      <BookmarkForm />
    </div>
  );
};
