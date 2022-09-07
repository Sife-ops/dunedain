import { Category as CategoryType } from "../../../../graphql/genql/schema";
import { ThemeTypings } from "@chakra-ui/react";
import { useCategoryCreateMutation } from "../../query/category-create";
import { useCategoryDeleteMutation } from "../../query/category-delete";
import { useCategoryEditMutation } from "../../query/category-edit";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const useCategoryForm = (category?: CategoryType) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<ThemeTypings["colorSchemes"]>("blue");

  const [categoryCreateState, categoryCreate] = useCategoryCreateMutation();
  const [categoryDeleteState, categoryDelete] = useCategoryDeleteMutation();
  const [categoryEditState, categoryEdit] = useCategoryEditMutation();

  useEffect(() => {
    const { fetching, data, error } = categoryCreateState;
    if (!fetching && !error && data) {
      navigate(-1);
    }
  }, [categoryCreateState.data]);

  useEffect(() => {
    const { fetching, data, error } = categoryEditState;
    if (!fetching && !error && data) {
      navigate(-1);
    }
  }, [categoryEditState.data]);

  useEffect(() => {
    const { fetching, data, error } = categoryDeleteState;
    if (!fetching && !error && data) {
      navigate(-1);
    }
  }, [categoryDeleteState.data]);

  useEffect(() => {
    if (category) {
      setTitle(category.title);
      setColor(category.color);
    }
  }, []);

  return {
    state: {
      title,
      color,

      categoryCreateState,
      categoryDeleteState,
      categoryEditState,
    },
    mutation: {
      categoryCreate,
      categoryDelete,
      categoryEdit,
    },
    set: {
      setTitle,
      setColor,
    },
  };
};
