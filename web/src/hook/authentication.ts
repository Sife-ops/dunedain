// import { Auth } from "@aws-amplify/auth";
import { useEffect, useState } from "react";

export type Authentication = {
  signedIn: boolean;
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  sync: () => boolean;
  clearCookie: () => void;
  setCookie: () => void;
};

export const useAuthentication = (): Authentication => {
  const [signedIn, setSignedIn] = useState(true);

  useEffect(() => {
    // todo: state update breaks refresh
    if (!getCookie()) setSignedIn(false);
  }, []);

  const getCookie = () => {
    return localStorage.getItem("cookie");
  };

  const setCookie = () => {
    localStorage.setItem("cookie", "cookie");
  };

  const clearCookie = () => {
    localStorage.clear();
  };

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    // await Auth.signIn(email, password);
    setCookie();
    // setSignedIn(true);
    window.location.reload();
  };

  const signOut = async () => {
    // await Auth.signOut();
    clearCookie();
    // setSignedIn(false);
    window.location.reload();
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

    clearCookie,
    setCookie,
    signIn,
    signOut,
    sync,
  };
};
