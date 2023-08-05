import React, { useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom"; // Make sure to import the necessary components and styles
import Card from "../../components/card/Card";
import { BiLogIn } from "react-icons/bi";
import "./auth.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authService";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const naigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = formData;

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handelLoginUser = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };

    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      console.log(data);
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
      <Card>
        <div>
          <div className="">
            <BiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>

          <form onSubmit={handelLoginUser}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handelInputChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handelInputChange}
              required
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
