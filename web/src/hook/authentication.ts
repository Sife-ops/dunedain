import { useEffect, useState } from "react";

export const useAuthentication = () => {
  const [signedIn, setSignedIn] = useState(true);

  const update = () => {
    const cookie = localStorage.getItem("signedIn");
    if (cookie) setSignedIn(true);
    else setSignedIn(false);
  };

  return {
    signedIn,
    setSignedIn,
    update,
  };
};
