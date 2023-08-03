import React from "react";
import { GrPowerReset } from "react-icons/gr";
import { Link } from "react-router-dom"; // Make sure to import the necessary components and styles
import Card from "../../components/card/Card";

import "./auth.css";

const Reset = () => {
  return (
    <div className="login__container">
      <Card>
        <div>
          <div className="">
            <GrPowerReset size={35} color="#999" />
          </div>
          <h2>Reset</h2>

          <form>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              required
              name="password"
            />
            <button type="submit" className="">
              Reset Password
            </button>
          </form>

          <span>
            <Link to="/">Home</Link>
            <p> &nbsp; &nbsp;</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
