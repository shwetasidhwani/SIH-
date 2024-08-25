import React from "react";

function LoginSignUp() {
  return (
    <div>
      <h2>Login / Sign-Up</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <p>Or sign up for an account!</p>
    </div>
  );
}

export default LoginSignUp;
