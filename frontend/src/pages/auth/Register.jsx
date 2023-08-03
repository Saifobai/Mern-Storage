import React from "react";
import "./auth.css";
import { Link } from "react-router-dom"; // Make sure to import the necessary components and styles
import Card from "../../components/card/Card";
import { TiUserAddOutline } from "react-icons/ti";

const Register = () => {
  return (
    <div className="login__container">
      <Card>
        <div>
          <div className="">
            <TiUserAddOutline size={35} color="#858484" />
          </div>
          <h2>Register</h2>

          <form>
            <input type="text" name="name" placeholder="name" />
            <input type="email" placeholder="Email" required name="email" />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="password"
            />

            <button type="submit" className="">
              Register
            </button>
          </form>

          <span>
            <Link to="/">Home</Link>
            <p> &nbsp; Have an account? &nbsp;</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
