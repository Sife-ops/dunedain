import React from "react";
import { HiPlus } from "react-icons/hi";
import { Button } from "@chakra-ui/react";
import { SelectableCategory } from "./use-categories";
import { useNavigate } from "react-router-dom";

export const Categories: React.FC<{
  className?: string;
  categories: SelectableCategory[] | null;
  toggleCategory: (category: SelectableCategory) => void;
  variant?: "filter";
}> = (props) => {
  const navigate = useNavigate();

  return (
    <div className={"grid gap-1 grid-cols-5 " + props.className}>
      {props.categories?.map((e) => (
        <Button
          key={e.categoryId}
          colorScheme={"blue"}
          onClick={() => props.toggleCategory(e)}
          variant={e.selected ? "solid" : "outline"}
        >
          {e.title}
        </Button>
      ))}
      {props.variant === "filter" && (
        <Button
          colorScheme={"teal"}
          fontSize={"4xl"}
          onClick={() => navigate("/category/new")}
          width={"64px"}
        >
          <HiPlus size={32} />
        </Button>
      )}
    </div>
  );
};
