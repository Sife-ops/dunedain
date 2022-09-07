import { useEffect, useState } from "react";

const getCookie = () => {
  return localStorage.getItem("cookie");
};

const setCookie = () => {
  localStorage.setItem("cookie", "cookie");
};

const clearCookie = () => {
  localStorage.removeItem("cookie");
};

export type Authentication = {
  signedIn: boolean;
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: () => void;
  signOut: () => void;
  sync: () => boolean;
};

export const useAuthentication = (): Authentication => {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (getCookie()) setSignedIn(true);
  }, []);

  const signIn = () => {
    setCookie();
    setSignedIn(true);
  };

  const signOut = () => {
    clearCookie();
    setSignedIn(false);
  };

  const sync = () => {
    if (getCookie()) {
      setSignedIn(true);
      return true;
    } else {
      setSignedIn(false);
      return false;
    }
  };

  return {
    signedIn,
    setSignedIn,

    signIn,
    signOut,
    sync,
  };
};
