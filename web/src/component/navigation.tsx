import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../hook/global-context";

const stage = import.meta.env.VITE_STAGE;

export const Navigation: React.FC = () => {
  const {
    authentication,
    categoriesResponse: [_, categoriesRefetch],
    foldersResponse: [__, folderRefetch],
    bookmarksFilter: {
      action: { searchDefault },
    },
  } = useGlobalContext();

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
          <Link to="/folders">
            <Button>Folders</Button>
          </Link>
        </div>
        <div className="flex gap-1">
          {stage === "dev" && (
            <Button
              onClick={async () => {
                categoriesRefetch();
              }}
            >
              Refetch Categories
            </Button>
          )}
          {stage === "dev" && (
            <Button
              onClick={async () => {
                searchDefault();
              }}
            >
              Refetch Bookmarks
            </Button>
          )}
          {stage === "dev" && (
            <Button
              onClick={async () => {
                folderRefetch();
              }}
            >
              Refetch Folders
            </Button>
          )}
          <Button
            onClick={async () => {
              await authentication.signOut();
            }}
          >
            Sign Out
          </Button>
        </div>
      </nav>
    );
  } else {
    return null;
  }
};
