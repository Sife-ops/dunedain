import { Bookmark as BookmarkType } from "@dunedain/graphql/genql/schema";
import { useBookmarkCreateMutation } from "../query/bookmark-create";
import { useBookmarkDeleteMutation } from "../query/bookmark-delete";
import { useBookmarkEditMutation } from "../query/bookmark-edit";
import { useNavigate } from "react-router-dom";
import { useSelectableCategories } from "./selectable-categories";
import { useState, useEffect } from "react";
import { useGlobalContext } from "./global-context";

export const useBookmarkForm = (bookmark?: BookmarkType) => {
  const navigate = useNavigate();

  const { categoriesResponse } = useGlobalContext();
  const selectableCategories = useSelectableCategories({
    bookmark,
    categoriesResponse,
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

  const create = () => {
    bookmarkCreate({
      input: {
        categoryIds:
          selectableCategories.categories
            ?.filter((e) => e.selected)
            .map((e) => e.categoryId) || [],
        title,
        url,
      },
    });
  };

  const edit = () => {
    if (bookmark) {
      bookmarkEdit({
        input: {
          bookmarkId: bookmark.bookmarkId,
          categoryIds:
            selectableCategories.categories
              ?.filter((e) => e.selected)
              .map((e) => e.categoryId) || [],
          title,
          url,
        },
      });
    }
  };

  const delete_ = () => {
    if (bookmark) {
      bookmarkDelete({ bookmarkId: bookmark.bookmarkId });
    }
  };

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
    selectableCategories,
    action: {
      edit,
      create,
      delete: delete_,
    },
  };
};
