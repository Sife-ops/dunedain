import React from "react";
import { SelectableCategory } from "../component/categories";
import { BookmarkForm } from "../component/bookmark-form";

export const BookmarkNew: React.FC<{}> = (props) => {
  return (
    <div>
      <BookmarkForm />
    </div>
  );
};
