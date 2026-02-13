import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">

        <div>
          <h2>Food<span>Bite</span></h2>
          <p>Delicious food delivered fast at your doorstep.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div>
          <h3>Follow Us</h3>
          <div className="socials">
            <Facebook />
            <Instagram />
            <Twitter />
            <Linkedin />
          </div>
        </div>

      </div>

      <p className="footer-bottom">
        © 2025 FoodBite. All Rights Reserved.
      </p>
    </footer>
  );
}
