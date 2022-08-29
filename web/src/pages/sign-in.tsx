import { Auth } from "@aws-amplify/auth";
import { useState } from "react";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await Auth.signIn(email, password);
            console.log(res);
            localStorage.setItem(
              "accessToken",
              res.signInUserSession.accessToken.jwtToken
            );
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
