import React from "react";
import { Button } from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";
import { Loading } from "../loading";
import { UseCategoriesResponse } from "../../query/categories";
import { useNavigate } from "react-router-dom";
import { useSelectableCategories } from "../../hook/selectable-categories";

export const Categories: React.FC<{
  buttonNew?: boolean;
  className?: string;
  selectable?: boolean;
  useCategoriesResponse: UseCategoriesResponse;
}> = (props) => {
  const navigate = useNavigate();

  const [{ data }] = props.useCategoriesResponse;

  const { selectableCategories, toggleCategory } = useSelectableCategories({
    useCategoriesResponse: props.useCategoriesResponse,
  });

  return (
    <Loading useQueryResponse={props.useCategoriesResponse}>
      <div className={"grid gap-1 grid-cols-5 " + props.className}>
        {props.selectable
          ? selectableCategories?.map((e) => (
              <Button
                key={e.categoryId}
                colorScheme={"blue"}
                onClick={() => toggleCategory(e)}
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
