import React, { useState } from "react";
import { Auth } from "@aws-amplify/auth";
import { Authentication } from "../hook/authentication";

export const SignIn: React.FC<{ auth: Authentication }> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h3>Sign In</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await Auth.signIn(email, password);
            props.auth.signIn();
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
