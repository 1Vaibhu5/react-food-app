// src/pages/Home.jsx
import React from "react";
import "./Home.css";
import Menu from "./Menu";
import About from "./About";

function Home() {
  return (
    <>
    <div className="slider-container">
      <div className="content-box">
        <h1 className="title">Welcome to FoodBite</h1>
        <p className="subtitle">Delicious food delivered at your doorstep.</p>
      </div>
    </div>
    <div>
      <About/>
    < Menu/>
    </div>

    </>
  );
}

export default Home;
