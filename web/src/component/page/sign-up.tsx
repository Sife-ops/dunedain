import { Auth } from "@aws-amplify/auth";
import { Heading, Input, Button, Text } from "@chakra-ui/react";
import { useBreakpoint } from "../../hook/breakpoint";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// todo: validation hooks
// todo: refactor
export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmMode, setConfirmMode] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");

  const navigate = useNavigate();
  const { isDesktop } = useBreakpoint();

  return (
    <div className="flex justify-center h-screen">
      {confirmMode ? (
        <form
          className={`flex flex-col justify-center ${
            isDesktop ? "w-1/4" : "w-full"
          }`}
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await Auth.confirmSignUp(email, confirmCode);
              navigate("/sign-in");
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <Heading textAlign={"center"}>Confirm</Heading>

          <Text marginBottom={"0"}>
            A confirmation code has been send to your email.
          </Text>

          <Input
            marginBottom={"1"}
            onChange={(e) => setConfirmCode(e.target.value)}
            placeholder="code"
            value={confirmCode}
          />

          <Button colorScheme={'teal'} type="submit">Confirm</Button>
        </form>
      ) : (
        <form
          className={`flex flex-col justify-center ${
            isDesktop ? "w-1/4" : "w-full"
          }`}
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
          <Heading marginBottom={"8"} textAlign={"center"}>
            Sign Up
          </Heading>

          <Input
            marginBottom={"1"}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            value={email}
          />

          <Input
            marginBottom={"1"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            type={"password"}
            value={password}
          />

          <Button marginBottom={"1"} colorScheme={"teal"} type="submit">
            Submit
          </Button>
          <Button colorScheme={"green"} onClick={() => navigate("/sign-in")}>
            Sign In
          </Button>
        </form>
      )}
    </div>
  );
};
