import { Auth } from "@aws-amplify/auth";
import { useState } from "react";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmCode, setConfirmCode] = useState("");

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("submit");
          try {
            const res = await Auth.signUp(email, password);
            console.log("register", res);
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
        <button type="submit">Sign Up</button>
      </form>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await Auth.confirmSignUp(confirmEmail, confirmCode);
            console.log("confirm", res);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <input
          onChange={(e) => setConfirmEmail(e.target.value)}
          placeholder="email"
          value={confirmEmail}
        />
        <input
          onChange={(e) => setConfirmCode(e.target.value)}
          placeholder="code"
          value={confirmCode}
        />
        <button type="submit">confirm</button>
      </form>
    </div>
  );
};
