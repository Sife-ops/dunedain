import { BiErrorCircle } from "react-icons/bi";
import { Heading, Input, Button, Text, ButtonGroup } from "@chakra-ui/react";
import { useBreakpoint } from "../../hook/breakpoint";
import { useNavigate } from "react-router-dom";
import { useSignUpForm } from "../../hook/sign-up-form";
import { useState } from "react";

const calculateFocusBorderColor = (errorVar: boolean, isValidVar: boolean) => {
  if (errorVar && !isValidVar) {
    return "red.500";
  } else if (!errorVar && isValidVar) {
    return "green.500";
  } else {
    return "";
  }
};

export const SignUp = () => {
  const navigate = useNavigate();
  const { isDesktop } = useBreakpoint();

  const signUpForm = useSignUpForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>();

  if (success) {
    return <div>check your email</div>;
  }

  return (
    <div className="flex justify-center h-screen">
      <form
        className={`flex flex-col justify-center ${
          isDesktop ? "w-1/4" : "w-full"
        }`}
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("submit");
          try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/sign-up", {
              method: "POST",
              body: JSON.stringify({
                email: signUpForm.email,
                password: signUpForm.password,
              }),
            });
            const parsed = await res.json();
            if (parsed.success) {
              setSuccess(true);
            } else {
              console.error(parsed);
              setError(parsed.message);
            }
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <Heading marginBottom={"8"} textAlign={"center"}>
          Sign Up
        </Heading>

        {error && (
          <div className="border-2 rounded-md border-red-500 bg-red-900 p-2 mb-4">
            <div className="flex">
              <p>Error</p>
              <BiErrorCircle className="ml-1" />
            </div>
            <p>{error}</p>
          </div>
        )}

        <Text>E-mail</Text>
        <Input
          errorBorderColor="red.500"
          focusBorderColor={calculateFocusBorderColor(
            signUpForm.emailError,
            signUpForm.emailIsValid
          )}
          isInvalid={signUpForm.emailError}
          marginBottom={"1"}
          onChange={(e) => signUpForm.setEmail(e.target.value)}
          // placeholder="email"
          type={"email"}
          value={signUpForm.email || ""}
        />
        <Text
          color={"red.500"}
          fontSize="sm"
          visibility={signUpForm.emailError ? undefined : "hidden"}
        >
          Invalid e-mail address.
        </Text>

        <Text>Password</Text>
        {/* <div className="flex justify-between">
          <Text>Password</Text>
          <Link as={RrdLink} to={"/sign-in"}>
            Forgot password?
          </Link>
        </div> */}
        <Input
          errorBorderColor="red.500"
          focusBorderColor={calculateFocusBorderColor(
            signUpForm.passwordError,
            signUpForm.passwordIsValid
          )}
          isInvalid={signUpForm.passwordError}
          marginBottom={"1"}
          onChange={(e) => signUpForm.setPassword(e.target.value)}
          // placeholder="password"
          type={"password"}
          value={signUpForm.password || ""}
        />
        <Text
          color={"red.500"}
          fontSize="sm"
          visibility={signUpForm.passwordError ? undefined : "hidden"}
        >
          Must contain one number and one special character.
        </Text>

        <Text>Confirm Password</Text>
        <Input
          errorBorderColor="red.500"
          focusBorderColor={calculateFocusBorderColor(
            signUpForm.confirmPasswordError,
            signUpForm.confirmPasswordIsValid
          )}
          isInvalid={signUpForm.confirmPasswordError}
          marginBottom={"1"}
          onChange={(e) => signUpForm.setConfirmPassword(e.target.value)}
          // placeholder="password"
          type={"password"}
          value={signUpForm.confirmPassword || ""}
        />
        <Text
          color={"red.500"}
          fontSize="sm"
          visibility={signUpForm.confirmPasswordError ? undefined : "hidden"}
        >
          Passwords must match.
        </Text>

        <ButtonGroup isAttached marginTop={4}>
          <Button
            flexGrow={1}
            marginBottom={"1"}
            colorScheme={"green"}
            type="submit"
            disabled={!signUpForm.formIsValid}
          >
            Submit
          </Button>
          <Button
            flexGrow={1}
            colorScheme={"blue"}
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
};
