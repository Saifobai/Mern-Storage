import React, { useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { Link, useParams } from "react-router-dom"; // Make sure to import the necessary components and styles
import Card from "../../components/card/Card";
import "./auth.css";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/authService";

const Reset = () => {
  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });

  const { password, passwordConfirm } = formData;

  const { resetToken } = useParams();

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const resetHandle = async (event) => {
    event.preventDefault();

    if (password.length < 6) {
      return toast.error("password must be up 6 charachters");
    }

    if (password !== passwordConfirm) {
      return toast.error("passwords do not match");
    }

    const userData = {
      password,
      passwordConfirm,
    };

    try {
      const data = await resetPassword(userData, resetToken);

      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login__container">
      <Card>
        <div>
          <div className="">
            <GrPowerReset size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={resetHandle}>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
              value={password}
              onChange={handelInputChange}
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              required
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={handelInputChange}
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
