import Logo from "../../assets/favicon.svg";
import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { useBreakpoint } from "../../hook/breakpoint";
import { useGlobalContext } from "../../hook/global-context";
import { useNavigate } from "react-router-dom";

export const SignIn: React.FC = () => {
  const nav = useNavigate();
  const { authentication } = useGlobalContext();
  const { isDesktop } = useBreakpoint();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center h-screen">
      <form
        className={`flex flex-col justify-center ${
          isDesktop ? "w-1/4" : "w-full"
        }`}
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await authentication.signIn({ email, password });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <div className="flex justify-center">
          <img src={Logo} className="mb-8 w-32" />
        </div>

        <Input
          marginBottom={"1"}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type={"email"}
          value={email}
        />

        <Input
          marginBottom={"1"}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type={"password"}
          value={password}
        />

        <Button marginBottom={"1"} colorScheme={"teal"} type="submit">
          Submit
        </Button>
        <Button colorScheme={"green"} onClick={() => nav("/sign-up")}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};
