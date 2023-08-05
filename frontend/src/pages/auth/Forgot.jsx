import React, { useState } from "react";
import { Link } from "react-router-dom"; // Make sure to import the necessary components and styles
import Card from "../../components/card/Card";
import { RiLockPasswordFill } from "react-icons/ri";
import "./auth.css";
import { forgotPassword, validateEmail } from "../../services/authService";
import { toast } from "react-toastify";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const forgotHandle = async () => {
    if (!email) {
      return toast.error("Enter your email");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
    };

    await forgotPassword(userData);
    setEmail("");
  };

  return (
    <div className="login__container">
      <Card>
        <div>
          <div className="">
            <RiLockPasswordFill size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>

          <form onSubmit={forgotHandle}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className="">
              Forgot Password
            </button>
          </form>

          <span>
            <Link to="/login">Login</Link>
            <p> &nbsp; &nbsp;</p>
            <Link to="/">Home</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;
