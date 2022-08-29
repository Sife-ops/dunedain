import { List } from "./Article";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";

export const Dev = () => {
  return (
    <div>
      <h3>register</h3>
      <SignUp />
      <h3>login</h3>
      <SignIn />
      <h3>articles</h3>
      <List />
    </div>
  );
};
