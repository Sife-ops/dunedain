import { useBookmarkCreateMutation } from "../../query/bookmark-create";
import { useBookmarkEditMutation } from "../../query/bookmark-edit";
import { useCategories } from "../categories";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const useBookmarkForm = () => {
  const navigate = useNavigate();

  const {
    categories,
    categoriesQueryState,
    setCategories,
    toggleCategory,
    updateCategories,
  } = useCategories();

  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);

  const [bookmarkCreateState, bookmarkCreate] = useBookmarkCreateMutation();
  const [bookmarkEditState, bookmarkEdit] = useBookmarkEditMutation();

  useEffect(() => {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    if (url.match(regex)) {
      setIsValidUrl(true);
    } else {
      setIsValidUrl(false);
    }
  }, [url]);

  useEffect(() => {
    if (title.length < 1) {
      setIsValidTitle(false);
    } else {
      setIsValidTitle(true);
    }
  }, [title]);

  useEffect(() => {
    if (isValidTitle && isValidUrl) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [isValidTitle, isValidUrl]);

  useEffect(() => {
    const { fetching, data, error } = bookmarkCreateState;
    if (!fetching && !error && data) {
      navigate("/");
    }
  }, [bookmarkCreateState.data]);

  useEffect(() => {
    const { fetching, data, error } = bookmarkEditState;
    if (!fetching && !error && data) {
      navigate("/");
    }
  }, [bookmarkEditState.data]);

  return {
    state: {
      categories,
      categoriesQueryState,

      title,
      url,
      isValidUrl,
      isValidTitle,
      isValidForm,

      bookmarkCreateState,
      bookmarkEditState,
    },
    set: {
      setCategories,
      toggleCategory,
      updateCategories,

      setTitle,
      setUrl,
    },
    mutation: {
      bookmarkCreate,
      bookmarkEdit,
    },
  };
};
