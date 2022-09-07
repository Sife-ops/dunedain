import React, { useState } from "react";
import { Auth } from "@aws-amplify/auth";
import { Authentication } from "../hook/authentication";
import { useBreakpoint } from "../hook/breakpoint";
import { Heading, Input, Text, Button } from "@chakra-ui/react";

export const SignIn: React.FC<{ auth: Authentication }> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isDesktop } = useBreakpoint();

  return (
    <div className="flex justify-center">
      <form
        className={`flex flex-col justify-center ${
          isDesktop ? "w-1/4" : "w-full"
        }`}
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
        {/* <Heading textAlign={"center"}>Sign In</Heading> */}

        <div className="mb-1">
          {/* <Text>Email:</Text> */}
          <Input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type={"email"}
            value={email}
          />
        </div>

        <div className="mb-1">
          {/* <Text>Password:</Text> */}
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type={"password"}
            value={password}
          />
        </div>

        <Button colorScheme={"teal"} type="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
};
