import { useEffect, useState } from "react";

// export let signInGlobal: boolean = false;

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
  //   signInGlobal: boolean;
  signedIn: boolean;
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: () => void;
  signOut: () => void;
  sync: () => void;
};

export const useAuthentication = (): Authentication => {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    // if (signInGlobal) setSignedIn(true);
    if (getCookie()) setSignedIn(true);
  }, []);

  const signIn = () => {
    // signInGlobal = true;
    setCookie();
    setSignedIn(true);
  };

  const signOut = () => {
    // signInGlobal = false;
    clearCookie();
    setSignedIn(false);
  };

  const sync = () => {
    // if (signInGlobal) setSignedIn(true);
    if (getCookie()) setSignedIn(true);
    else setSignedIn(false);
  };

  return {
    // signInGlobal,

    signedIn,
    setSignedIn,

    signIn,
    signOut,
    sync,
  };
};
