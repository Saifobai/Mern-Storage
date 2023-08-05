import React from "react";
import { logOutUser } from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN, selectName } from "../../redux/features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logOut = async () => {
    await logOutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };
  return (
    <div className="__pad header">
      <div className="flex__between">
        <h3>
          <span className="font__light">Welcome, </span>
          <span className="color__danger"> {name} </span>
        </h3>
        <button onClick={logOut} className="btn__danger">
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
