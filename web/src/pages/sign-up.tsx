import { Auth } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const SignUp = () => {
  // todo: hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmMode, setConfirmMode] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");

  const navigate = useNavigate();

  return (
    <div>
      {confirmMode ? <h3>Confirm</h3> : <h3>Sign Up</h3>}
      {confirmMode ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await Auth.confirmSignUp(email, confirmCode);
              navigate("sign-in");
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <input
            onChange={(e) => setConfirmCode(e.target.value)}
            placeholder="code"
            value={confirmCode}
          />
          <button type="submit">Confirm</button>
        </form>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log("submit");
            try {
              await Auth.signUp(email, password);
              setConfirmMode(true);
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            value={email}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            type={"password"}
            value={password}
          />
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
};
