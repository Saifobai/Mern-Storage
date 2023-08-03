import React from "react";
import "../../styles/HomePage.css";
import { Link } from "react-router-dom";
import { GrStorage } from "react-icons/gr";
import img1 from "../../assets/heroStore2.png";

const HomePage = () => {
  return (
    <div className="home__container">
      <nav>
        <div className="logo">
          <GrStorage />
        </div>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>

          <li>
            <Link to="/dashboard">DashBoard</Link>
          </li>
        </ul>
      </nav>

      {/* Hero section */}
      <section className="section__container">
        <div className="hero__text">
          <h2>Storage Manager</h2>
          <p style={{ color: "white" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi
            sequi sed quibusdam laborum unde nemo?
          </p>
          <button className="btn learn__more">Know More</button>
        </div>
        <div className="hero__image">
          <img src={img1} alt="..." />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
