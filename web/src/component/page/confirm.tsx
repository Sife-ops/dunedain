import React, { useEffect } from "react";

export const Confirm = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const accessToken = params.get("accessToken");

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/confirm", {
      method: "POST",
      body: JSON.stringify({
        accessToken,
      }),
    })
      .then((e) => e.json())
      .then((e) => console.log(e));
  }, []);

  return (
    <div>
      <div>confirm</div>
      <div>{accessToken}</div>
    </div>
  );
};
