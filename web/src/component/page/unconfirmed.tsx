import { Button } from "@chakra-ui/react";
import { useState } from "react";

export const Unconfirmed = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const email = params.get("email");

  const [resent, setResent] = useState(false);

  return (
    <div>
      <div>An access link has been sent to your e-mail.</div>
      <div>
        If you didn't receive an email, click the button to send it again.
      </div>
      {/* <div>If you still didn't receive an email, try again later.</div> */}
      <Button
        onClick={() => {
          fetch(import.meta.env.VITE_API_URL + "/resend-email", {
            method: "POST",
            body: JSON.stringify({
              email,
            }),
          })
            .then((e) => e.json())
            .then((e) => {
              if (e.success) {
                setResent(true);
              } else {
                console.error(e);
              }
            });
        }}
      >
        Send E-mail
      </Button>
      {resent && <div>E-mail sent!</div>}
    </div>
  );
};
