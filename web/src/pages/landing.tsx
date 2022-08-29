import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h3>Sign Up</h3>
      <button onClick={() => navigate("sign-up")}>Sign Up</button>
      <h3>Sign In</h3>
      <button onClick={() => navigate("sign-in")}>Sign In</button>
    </div>
  );
};
