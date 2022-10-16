import Logo from "../../assets/favicon.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { BsWindowSidebar } from "react-icons/bs";
import { useAuthContext } from "../../hook/auth-context";

export const Landing = () => {
  const nav = useNavigate();
  const auth = useAuthContext();

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-1/4 gap-1">
        <div className="flex justify-center">
          <img src={Logo} className="my-8 w-32" />
        </div>

        <Button
          onClick={() => {
            window.location.href =
              "http://localhost:3000/sign-in?serviceId=local";
          }}
        >
          Sign In
        </Button>

        <Button
          onClick={() => {
            window.location.href = "http://localhost:3000/sign-up";
          }}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};
