import React from "react";
import { Link } from "react-router-dom"; // Make sure to import the necessary components and styles
import Card from "../../components/card/Card";
import { BiLogIn } from "react-icons/bi";
import "./auth.css";

const LoginForm = () => {
  return (
    <div className="login__container">
      <Card>
        <div>
          <div className="">
            <BiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>

          <form>
            <input type="email" placeholder="Email" required name="email" />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
            />
            <button type="submit" className="">
              Login
            </button>
          </form>
          <Link to="/forgot">Forgot Password</Link>

          <span>
            <Link to="/">Home</Link>
            <p> &nbsp; Don't have an account? &nbsp;</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
