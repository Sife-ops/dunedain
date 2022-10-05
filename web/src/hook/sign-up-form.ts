import * as yup from "yup";
import { useState, useEffect } from "react";

const emailSchema = yup.string().email();
const passwordSchema = yup
  .string()
  .min(8)
  .matches(/[0-9]/)
  .matches(/[!@#\$%\^\&*\)\(+=._-]/);

const isInitialized = (o: any) => o !== null;

const validationEffect = (
  stateVar: string | null,
  schema: any, // todo: specific type
  setIsValidFn: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorFn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!stateVar) {
    setIsValidFn(false);
    if (isInitialized(stateVar)) {
      setErrorFn(true);
    } else {
      setErrorFn(false);
    }
  } else if (schema.isValidSync(stateVar)) {
    setIsValidFn(true);
    setErrorFn(false);
  } else {
    setIsValidFn(false);
    setErrorFn(true);
  }
};

export const useSignUpForm = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState<string | null>(null);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    // todo: unit test?
    validationEffect(
      //
      email,
      emailSchema,
      setEmailIsValid,
      setEmailError
    );
  }, [email]);

  useEffect(() => {
    validationEffect(
      password,
      passwordSchema,
      setPasswordIsValid,
      setPasswordError
    );
  }, [password]);

  useEffect(() => {
    if (emailIsValid && passwordIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [emailIsValid, passwordIsValid]);

  return {
    email,
    emailError,
    emailIsValid,
    formIsValid,
    password,
    passwordError,
    passwordIsValid,
    setEmail,
    setPassword,
    setPasswordError,
    setPasswordIsValid,
  };
};
