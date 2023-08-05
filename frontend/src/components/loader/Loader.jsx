import React from "react";
import loadImg from "../../assets/loader.png";
import ReactDOM from "react-dom";
import "./loader.css";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loadImg} alt="..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const SpinnerImg = () => {
  return (
    <div className="center__all">
      <img src={loadImg} alt="..." />
    </div>
  );
};

export default Loader;
