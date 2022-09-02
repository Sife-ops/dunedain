import { BookmarksContainer } from "../component/bookmarks";
import { CategoriesContainer } from "../component/categories";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h3>Categories</h3>

      <button onClick={() => navigate("category/new")}>New Category</button>
      <br />
      <br />

      <CategoriesContainer />

      <h3>Bookmarks</h3>

      <button onClick={() => navigate("bookmark/new")}>New Bookmark</button>
      <br />
      <br />

      <BookmarksContainer />
    </div>
  );
};
