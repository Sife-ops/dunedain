// import { useGlobalContext } from "../../hook/global-context";
import Logo from "../../assets/favicon.svg";
import React, { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { Input, Button, ButtonGroup, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useBreakpoint } from "../../hook/breakpoint";
import { useNavigate } from "react-router-dom";

export const SignIn: React.FC = () => {
  const nav = useNavigate();
  // const { authentication } = useGlobalContext();
  const { isDesktop } = useBreakpoint();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex justify-center h-screen">
      <form
        className={`flex flex-col justify-center ${
          isDesktop ? "w-1/4" : "w-full"
        }`}
        onSubmit={async (e) => {
          e.preventDefault();
          fetch(import.meta.env.VITE_API_URL + "/sign-in", {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
            }),
          })
            .then((e) => e.json())
            .then((e) => {
              if (e.success) {
                console.log(e.accessToken);
              } else {
                console.error(e);
                if (e.message === "Error: unconfirmed") {
                  nav(`/unconfirmed?email=${email}`);
                } else {
                  setError(e.message);
                }
              }
            });
        }}
      >
        <div className="flex justify-center">
          <img src={Logo} className="mb-8 w-32" />
        </div>

        {error && (
          <div className="border-2 rounded-md border-red-500 bg-red-900 p-2 mb-1">
            <div className="flex">
              <BiErrorCircle className="mr-1" />
              <p>{error}</p>
            </div>
          </div>
        )}

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

        <ButtonGroup isAttached marginBottom={"1"}>
          <Button flexGrow={1} colorScheme={"green"} type="submit">
            Submit
          </Button>
          <Button
            flexGrow={1}
            colorScheme={"blue"}
            onClick={() => nav("/sign-up")}
          >
            Sign Up
          </Button>
        </ButtonGroup>

        {/* todo: forgot password? */}
        {/* <div> */}
        <Link as={RouterLink} to={"/forgot-password"} textAlign={"center"}>
          Forgot password?
        </Link>
        {/* </div> */}
      </form>
    </div>
  );
};
