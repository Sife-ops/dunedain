import { Auth } from "@aws-amplify/auth";
import { useState } from "react";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h3>Sign In</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await Auth.signIn(email, password);
            localStorage.setItem(
              "accessToken",
              res.signInUserSession.accessToken.jwtToken
            );
            window.location.reload();
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
