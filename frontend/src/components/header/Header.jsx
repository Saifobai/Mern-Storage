import React from "react";

const Header = () => {
  return (
    <div className="__pad header">
      <div className="flex__between">
        <h3>
          <span className="font__light">Welcome, </span>
          <span className="color__danger">Sam </span>
        </h3>
        <button className="btn__danger">Logout</button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
