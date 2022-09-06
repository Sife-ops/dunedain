import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navigation: React.FC = () => {
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
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Sign Out
      </Button>
    </nav>
  );
};
