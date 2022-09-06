import { Bookmark as BookmarkType } from "../../../../graphql/genql/schema";
import { useBookmarkCreateMutation } from "../../query/bookmark-create";
import { useBookmarkDeleteMutation } from "../../query/bookmark-delete";
import { useBookmarkEditMutation } from "../../query/bookmark-edit";
import { useCategoriesQuery } from "../../query/categories";
import { useNavigate } from "react-router-dom";
import { useSelectableCategories } from "../../hook/selectable-categories";
import { useState, useEffect } from "react";

export const useBookmarkForm = (bookmark?: BookmarkType) => {
  const navigate = useNavigate();

  const useCategoriesResponse = useCategoriesQuery();
  const selectableCategories = useSelectableCategories({
    useCategoriesResponse,
    bookmark,
  });

  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);

  const [bookmarkCreateState, bookmarkCreate] = useBookmarkCreateMutation();
  const [bookmarkEditState, bookmarkEdit] = useBookmarkEditMutation();
  const [bookmarkDeleteState, bookmarkDelete] = useBookmarkDeleteMutation();

  useEffect(() => {
    if (bookmark) {
      setUrl(bookmark.url);
      setTitle(bookmark.title);
    }
  }, []);

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
      // todo: navigate cancels reexec causing 'NS_BINDING_ABORTED'
      navigate(-1);
    }
  }, [bookmarkCreateState.data]);

  useEffect(() => {
    const { fetching, data, error } = bookmarkEditState;
    if (!fetching && !error && data) {
      navigate(-1);
    }
  }, [bookmarkEditState.data]);

  useEffect(() => {
    const { fetching, data, error } = bookmarkDeleteState;
    if (!fetching && !error && data) {
      navigate(-1);
    }
  }, [bookmarkDeleteState.data]);

  return {
    input: {
      isValidForm,
      isValidTitle,
      isValidUrl,
      setTitle,
      setUrl,
      title,
      url,
    },
    categories: {
      useCategoriesResponse,
      selectableCategories,
    },
    operation: {
      bookmarkCreate: { state: bookmarkCreateState, mutation: bookmarkCreate },
      bookmarkEdit: { state: bookmarkEditState, mutation: bookmarkEdit },
      bookmarkDelete: { state: bookmarkDeleteState, mutation: bookmarkDelete },
    },
  };
};
