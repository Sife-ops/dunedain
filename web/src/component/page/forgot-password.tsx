import * as yup from "yup";
import { Button, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const emailSchema = yup
  .string()
  .email()
  .required();

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resent, setResent] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);

  useEffect(() => {
    if (emailSchema.isValidSync(email)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  }, [email]);

  return (
    <div>
      <div>E-mail</div>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button
        disabled={!emailIsValid}
        onClick={() => {
          fetch(import.meta.env.VITE_API_URL + "/reset-password", {
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
        Send Reset Link
      </Button>
      {resent && <div>E-mail sent!</div>}
    </div>
  );
};
