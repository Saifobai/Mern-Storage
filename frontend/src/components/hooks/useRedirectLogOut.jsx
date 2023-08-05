import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoginStatus } from "../../services/authService";
import { SET_LOGIN } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const useRedirectLogOut = (path) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirectUser = async () => {
    const isLoggedIn = await getLoginStatus();
    dispatch(SET_LOGIN(isLoggedIn));

    if (!isLoggedIn) {
      toast.info("Session expired,please login to continue");
      navigate(path);
      return;
    }
  };

  useEffect(() => {
    redirectUser();
  }, [navigate, path, dispatch]);
};

export default useRedirectLogOut;
