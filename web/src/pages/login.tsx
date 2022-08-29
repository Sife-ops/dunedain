export const Login = () => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit");
        }}
      >
        <input placeholder="email" />
        <input placeholder="password" />
        <button type="submit">login</button>
      </form>
    </div>
  );
};
