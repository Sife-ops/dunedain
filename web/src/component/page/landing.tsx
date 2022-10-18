import Logo from "../../assets/favicon.svg";
import { Button } from "@chakra-ui/react";

export const Landing = () => {
  const serviceId =
    import.meta.env.VITE_STAGE === "prod" ? "bookmarks" : "local";

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-1/4 gap-1">
        <div className="flex justify-center">
          <img src={Logo} className="my-8 w-32" />
        </div>

        <Button
          onClick={() => {
            window.location.href = `${
              import.meta.env.VITE_MANDOS_URL
            }/sign-in?serviceId=${serviceId}`;
          }}
        >
          Sign In
        </Button>

        <Button
          hidden
          onClick={() => {
            window.location.href = `${
              import.meta.env.VITE_MANDOS_URL_CLOUDFRONT
            }/sign-in?serviceId=${serviceId}-cloudfront`;
          }}
        >
          Cloudfront
        </Button>
      </div>
    </div>
  );
};
