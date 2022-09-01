import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export const BookmarkDetails: React.FC = () => {
  const { bookmarkId } = useParams();

  useEffect(() => {
    console.log(bookmarkId);
  }, []);

  return (
    <div>
      <div>a</div>
    </div>
  );
};
