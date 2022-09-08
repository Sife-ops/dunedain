import React from "react";
import { Button } from "@chakra-ui/react";
import { Category as CategoryType } from "@dunedain/graphql/genql";
import { HiPlus } from "react-icons/hi";
import { Loading } from "../loading";
import { SelectableCategory } from "../../hook/selectable-categories";
import { UseCategoriesResponse } from "../../query/categories";
import { useBreakpoint } from "../../hook/breakpoint";
import { useNavigate } from "react-router-dom";

export const Categories: React.FC<{
  buttonNew?: boolean;
  className?: string;
  useCategoriesResponse: UseCategoriesResponse;
  useSelectableCategories?: {
    selectableCategories: SelectableCategory[] | null;
    resetCategories: () => void;
    toggleCategory: (
      category: CategoryType
    ) => SelectableCategory[] | undefined;
    updateCategories: (selectableCategories: SelectableCategory[]) => void;
  };
}> = (props) => {
  const navigate = useNavigate();

  const [useCategoriesState] = props.useCategoriesResponse;

  return (
    <Loading data={useCategoriesState.data}>
      <div className={"grid gap-1 grid-cols-5 " + props.className}>
        {props.useSelectableCategories
          ? props.useSelectableCategories.selectableCategories?.map((e) => (
              <Category
                category={e}
                key={e.categoryId}
                onClick={() => props.useSelectableCategories?.toggleCategory(e)}
              />
            ))
          : useCategoriesState.data?.categories.map((e) => (
              <Category
                category={e}
                key={e.categoryId}
                onClick={() => navigate(`/category/${e.categoryId}`)}
              />
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

const Category: React.FC<{
  category: CategoryType | SelectableCategory;
  onClick: () => void;
}> = (props) => {
  const { isDesktop } = useBreakpoint();

  return (
    <Button
      key={props.category.categoryId}
      colorScheme={props.category.color}
      onClick={props.onClick}
      variant={(() => {
        // @ts-ignore
        const selected = props.category.selected;
        if (selected !== undefined) {
          if (selected) {
            return "solid";
          } else {
            return "outline";
          }
        } else {
          return "solid";
        }
      })()}
    >
      <div className="grow">{props.category.title}</div>
      {isDesktop && <div>{props.category.bookmarks.length}</div>}
    </Button>
  );
};
