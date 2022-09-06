import React from "react";
import { Button } from "@chakra-ui/react";
import { Category } from "@dunedain/graphql/genql";
import { HiPlus } from "react-icons/hi";
import { Loading } from "../loading";
import { SelectableCategory } from "../../hook/selectable-categories";
import { UseCategoriesResponse } from "../../query/categories";
import { useNavigate } from "react-router-dom";

export const Categories: React.FC<{
  buttonNew?: boolean;
  className?: string;
  useCategoriesResponse: UseCategoriesResponse;
  useSelectableCategories?: {
    selectableCategories: SelectableCategory[] | null;
    resetCategories: () => void;
    toggleCategory: (category: Category) => SelectableCategory[] | undefined;
    updateCategories: (selectableCategories: SelectableCategory[]) => void;
  };
}> = (props) => {
  const navigate = useNavigate();

  const [{ data }] = props.useCategoriesResponse;

  return (
    <Loading useQueryResponse={props.useCategoriesResponse}>
      <div className={"grid gap-1 grid-cols-5 " + props.className}>
        {props.useSelectableCategories
          ? props.useSelectableCategories.selectableCategories?.map((e) => (
              <Button
                key={e.categoryId}
                colorScheme={"blue"}
                onClick={() => props.useSelectableCategories?.toggleCategory(e)}
                variant={e.selected ? "solid" : "outline"}
              >
                {e.title}
              </Button>
            ))
          : data?.categories.map((e) => (
              <Button
                key={e.categoryId}
                colorScheme={"blue"}
                onClick={() => navigate(`/category/${e.categoryId}`)}
              >
                {e.title}
              </Button>
            ))}
        {props.buttonNew && (
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
    </Loading>
  );
};
