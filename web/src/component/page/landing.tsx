import Logo from "../../assets/favicon.svg";
import { Button } from "@chakra-ui/react";

const stage = import.meta.env.VITE_STAGE;

const mandos =
  stage === "prod" ? "???" : "https://d2d8usjkpby83o.cloudfront.net";

const serviceId = stage === "prod" ? "dunedain" : "local";

export const Landing = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-1/4 gap-1">
        <div className="flex justify-center">
          <img src={Logo} className="my-8 w-32" />
        </div>

        <Button
          onClick={() => {
            window.location.href = `${mandos}/sign-in?serviceId=${serviceId}`;
          }}
        >
          Sign In
        </Button>

        <Button
          onClick={() => {
            window.location.href = `${mandos}/sign-up`;
          }}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};
