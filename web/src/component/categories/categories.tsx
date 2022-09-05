import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { SelectableCategory } from "./use-categories";
import { useNavigate } from "react-router-dom";

export const Categories: React.FC<{
  className?: string;
  categories: SelectableCategory[] | null;
  toggleCategory: (category: SelectableCategory) => void;

  filterProps?: {
    resetCategories: () => void;
    search: (
      args?:
        | {
            categoryIds?: string[] | undefined;
            categoryOpt?: "And" | "Or" | undefined;
          }
        | undefined
    ) => void;
    setCategoryOpt: (value: React.SetStateAction<"And" | "Or">) => void;
  };
}> = (props) => {
  const navigate = useNavigate();

  return (
    <div className={"grid gap-1 grid-cols-5 " + props.className}>
      {props.filterProps && (
        <div className="flex gap-1">
          <Select
            onChange={(e) => {
              const categoryOpt = e.target.value as "And" | "Or";
              props.filterProps?.setCategoryOpt(categoryOpt);
              props.filterProps?.search({ categoryOpt });
            }}
          >
            <option>And</option>
            <option>Or</option>
          </Select>

          <ButtonGroup variant={"solid"} isAttached>
            <Button
              className="grow"
              colorScheme={"teal"}
              onClick={(e) => {
                props.filterProps?.search();
              }}
            >
              Filter
            </Button>

            <Button
              className="grow"
              colorScheme={"gray"}
              onClick={(e) => {
                props.filterProps?.resetCategories();
              }}
            >
              Reset
            </Button>
          </ButtonGroup>
        </div>
      )}
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
      {props.filterProps && (
        <Button
          colorScheme={"teal"}
          fontSize={"4xl"}
          onClick={() => navigate("/category/new")}
          width={"64px"}
        >
          +
        </Button>
      )}
    </div>
  );
};
