import { List } from "./Article";
import { Login } from "./login";
import { Register } from "./register";

export const Dev = () => {
  return (
    <div>
      <h3>register</h3>
      <Register />
      <h3>login</h3>
      <Login />
      <h3>articles</h3>
      <List />
    </div>
  );
};
