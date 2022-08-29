import { Auth } from "@aws-amplify/auth";
import { setAccessToken } from "../token";
import { useState } from "react";

export const Login = () => {
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
            // console.log(res.signInUserSession.accessToken.jwtToken);
            setAccessToken(res.signInUserSession.accessToken.jwtToken);
            // p.setIsSignedIn(true);
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
        <button type="submit">login</button>
      </form>
    </div>
  );
};
