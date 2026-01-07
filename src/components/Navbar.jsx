// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LogIn, LogOut, Menu, X } from "lucide-react";
import "./Navbar.css";

export default function Navbar({ cart }) {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("foodbite_auth") === "true";

  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false); // ✅ hamburger state

  const handleSearch = () => {
    if (!searchText.trim()) return;
    navigate("/search", { state: { searchText } });
    setSearchText("");
    setIsOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("foodbite_auth");
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">
        {/* LEFT – BRAND */}
        <Link to="/" className="brand">
          Food<span>Bite</span>
        </Link>

        {/* SEARCH */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search food..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* HAMBURGER */}
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </div>

        {/* RIGHT MENU */}
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/menu" className="nav-link">
            Menu
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>

          <Link to="/cart" className="cart" onClick={() => setIsOpen(false)}>
            <ShoppingCart />
            {cart.length > 0 && <span>{cart.length}</span>}
          </Link>

          {!isAuth ? (
            <>
              <NavLink to="/login" className="login-btn">
                Login
              </NavLink>
              <NavLink to="/register" className="register-btn">
                Register
              </NavLink>
            </>
          ) : (
            <button className="logout" onClick={logout}>
              <LogOut size={18} /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
