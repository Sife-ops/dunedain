import { Heading, Input, Button } from "@chakra-ui/react";
import { useBreakpoint } from "../../hook/breakpoint";
import { useNavigate } from "react-router-dom";
import { useSignUpForm } from "../../hook/sign-up-form";

export const SignUp = () => {
  const navigate = useNavigate();
  const { isDesktop } = useBreakpoint();

  const signUpForm = useSignUpForm();

  const calculateFocusBorderColor = (
    errorVar: boolean,
    isValidVar: boolean
  ) => {
    if (errorVar && !isValidVar) {
      return "red.500";
    } else if (!errorVar && isValidVar) {
      return "green.500";
    } else {
      return "";
    }
  };

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
            console.log(res);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <Heading marginBottom={"8"} textAlign={"center"}>
          Sign Up
        </Heading>

        <Input
          errorBorderColor="red.500"
          focusBorderColor={calculateFocusBorderColor(
            signUpForm.emailError,
            signUpForm.emailIsValid
          )}
          isInvalid={signUpForm.emailError}
          marginBottom={"1"}
          onChange={(e) => signUpForm.setEmail(e.target.value)}
          placeholder="email"
          type={"email"}
          value={signUpForm.email || ""}
        />

        <Input
          errorBorderColor="red.500"
          focusBorderColor={calculateFocusBorderColor(
            signUpForm.passwordError,
            signUpForm.passwordIsValid
          )}
          isInvalid={signUpForm.passwordError}
          marginBottom={"1"}
          onChange={(e) => signUpForm.setPassword(e.target.value)}
          placeholder="password"
          type={"password"}
          value={signUpForm.password || ""}
        />

        <Button
          marginBottom={"1"}
          colorScheme={"teal"}
          type="submit"
          disabled={!signUpForm.formIsValid}
        >
          Submit
        </Button>
        <Button colorScheme={"green"} onClick={() => navigate("/sign-in")}>
          Sign In
        </Button>
      </form>
    </div>
  );
};
