import React, { useState } from "react";
import "./sidebar.css";
import { GrStorage } from "react-icons/gr";
import { HiMenuAlt3 } from "react-icons/hi";
import menu from "../../data/sidebar";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top__section">
          <div className="logo">
            <GrStorage
              onClick={goHome}
              size={35}
              color="#ffff"
              style={{ display: isOpen ? "block" : "none" }}
            />
          </div>
          <div
            className="bars"
            style={{ marginLeft: isOpen ? "130px" : "0px" }}
          >
            <HiMenuAlt3 onClick={handleToggleOpen} size={35} color="#ffff" />
          </div>
        </div>
        {menu.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>
      <main
        style={{
          paddingLeft: isOpen ? "230px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
