import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom"; // Make sure to import the necessary components and styles
import Card from "../../components/card/Card";
import { TiUserAddOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import { register, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const dispatch = useDispatch();
  const naigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { name, email, password, passwordConfirm } = formData;

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("password must be up 6 charachters");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    if (password !== passwordConfirm) {
      return toast.error("passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
    };

    setIsLoading(true);

    try {
      const data = await register(userData);

      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      naigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="login__container">
      {isLoading && <Loader />}
      <Card>
        <div>
          <div className="">
            <TiUserAddOutline size={35} color="#858484" />
          </div>
          <h2>Register</h2>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={name}
              onChange={handelInputChange}
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handelInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handelInputChange}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={handelInputChange}
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
