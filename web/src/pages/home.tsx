import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h3>Home</h3>
      <p>home page</p>
      {/* todo: conditional, only in nonprod */}
      <button onClick={() => navigate("dev")}>dev</button>
    </div>
  );
};
