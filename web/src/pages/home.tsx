import { Bookmarks } from "../component/bookmarks";
import { useCategories, Categories } from "../component/categories";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const { categories, toggleCategory } = useCategories();

  return (
    <div>
      <h3>Categories</h3>

      <Categories categories={categories} toggleCategory={toggleCategory} />

      <h3>Bookmarks</h3>

      <button onClick={() => navigate("bookmark/new")}>New Bookmark</button>
      <br />
      <br />

      <Bookmarks />
    </div>
  );
};
