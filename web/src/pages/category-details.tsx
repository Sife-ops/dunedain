import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export const CategoryDetails: React.FC = () => {
  const { categoryId } = useParams();

  useEffect(() => {
    console.log(categoryId);
  }, []);

  return (
    <div>
      <div>a</div>
    </div>
  );
};
