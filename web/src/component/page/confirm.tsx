import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Confirm = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const accessToken = params.get("accessToken");

  const [loading, setLoading] = useState(true);

  const nav = useNavigate();

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/confirm", {
      method: "POST",
      body: JSON.stringify({
        accessToken,
      }),
    })
      .then((e) => e.json())
      .then((e) => {
        if (e.success) {
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        nav("/sign-in");
      }, 5000);
    }
  }, [loading]);

  if (loading) {
    return <div>loading...</div>;
  }

  return <div>congratulations!</div>;
};
