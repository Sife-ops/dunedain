import React from "react";
import { Authentication } from "../hook/authentication";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export const Navigation: React.FC<{ auth: Authentication }> = (props) => {
  const nav = useNavigate();

  if (props.auth.signedIn) {
    return (
      <nav className="flex justify-between mb-1">
        <div className="flex gap-1">
          <Link to="/">
            <Button>Home</Button>
          </Link>
          <Link to="/categories">
            <Button>Categories</Button>
          </Link>
        </div>
        <Button onClick={() => props.auth.signOut()}>Sign Out</Button>
      </nav>
    );
  } else {
    return null;
  }
};
