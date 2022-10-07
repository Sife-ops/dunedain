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
  condition: boolean,
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
  } else if (condition) {
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

  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    validationEffect(
      email,
      emailSchema.isValidSync(email),
      setEmailIsValid,
      setEmailError
    );
  }, [email]);

  useEffect(() => {
    validationEffect(
      password,
      passwordSchema.isValidSync(password),
      setPasswordIsValid,
      setPasswordError
    );
  }, [password]);

  useEffect(() => {
    validationEffect(
      confirmPassword,
      confirmPassword === password,
      setConfirmPasswordIsValid,
      setConfirmPasswordError
    );
  }, [confirmPassword, password]);

  useEffect(() => {
    if (emailIsValid && passwordIsValid && confirmPasswordIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [emailIsValid, passwordIsValid, confirmPasswordIsValid]);

  return {
    confirmPassword,
    confirmPasswordError,
    confirmPasswordIsValid,
    email,
    emailError,
    emailIsValid,
    formIsValid,
    password,
    passwordError,
    passwordIsValid,
    setConfirmPassword,
    setEmail,
    setPassword,
    setPasswordError,
    setPasswordIsValid,
  };
};
