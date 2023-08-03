import React from "react";
import { Link } from "react-router-dom"; // Make sure to import the necessary components and styles
import Card from "../../components/card/Card";
import { RiLockPasswordFill } from "react-icons/ri";
import "./auth.css";

const Forgot = () => {
  return (
    <div className="login__container">
      <Card>
        <div>
          <div className="">
            <RiLockPasswordFill size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>

          <form>
            <input type="email" placeholder="Email" required name="email" />

            <button type="submit" className="">
              Forgot Password
            </button>
          </form>

          <span>
            <Link to="/login">Login</Link>
            <p> &nbsp; &nbsp;</p>
            <Link to="/home">Home</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;
