import { useState, useEffect } from "react";

export const useBookmarkForm = () => {
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);

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

  return {
    formState: {
      title,
      url,
      isValidUrl,
      isValidTitle,
      isValidForm,
    },
    formSet: {
      setTitle,
      setUrl,
    },
  };
};
