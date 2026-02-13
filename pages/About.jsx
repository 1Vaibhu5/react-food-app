import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About FoodBite</h1>

        <p>
          FoodBite is your one-stop destination for delicious meals prepared 
          with love and delivered right to your doorstep. We focus on freshness, 
          hygiene, quality, and fast delivery.
        </p>

        <h2>Why Choose Us?</h2>
        <p>
          ✔ Freshly prepared meals <br />
          ✔ Fast & safe delivery <br />
          ✔ Affordable prices <br />
          ✔ Wide range of categories <br />
          ✔ Easy online ordering <br />
        </p>

        <h2>Our Vision</h2>
        <p>
          To become India’s most loved online food delivery platform by offering 
          an unforgettable food experience.
        </p>
      </div>
    </div>
  );
}
