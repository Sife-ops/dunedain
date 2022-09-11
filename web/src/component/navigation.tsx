import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../hook/global-context";

export const Navigation: React.FC = () => {
  const { authentication } = useGlobalContext();

  if (authentication.signedIn) {
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
        <Button
          onClick={async () => {
            await authentication.signOut();
          }}
        >
          Sign Out
        </Button>
      </nav>
    );
  } else {
    return null;
  }
};
