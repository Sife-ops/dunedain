import { useMediaQuery } from "@chakra-ui/react";

export const useBreakpoint = () => {
  const [isDesktop] = useMediaQuery("(min-width: 481px)");

  return {
    isDesktop,
  };
};
