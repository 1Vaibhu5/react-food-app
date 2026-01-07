// src/pages/Menu.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import MenuData from "../pages/MenuData";
import Categories from "../components/Categories";
import "./Menu.css";

export default function Menu({ addToCart }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category"); // Pizza / Burger / null

  // const items = category ? MenuData[category] : [];
  const items = MenuData[category] || [];

  return (
    <div className="menu-page">

      {/* Categories always on top */}
      <Categories />

      {/* 🔹 DEFAULT: Hotel Special Dishes */}
      {!category && (
        <>
          <h2 className="menu-title">Hotel Special Dishes</h2>
          <div className="special-container">
            {MenuData.HotelSpecial.map((item) => (
              <div key={item.id} className="special-card">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <button onClick={() => addToCart(item)}>Add +</button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 🔹 CATEGORY CLICKED: Pizza / Burger */}
      {category && (
        <>
          <h2 className="menu-title">{category} Varieties</h2>

          <div className="menu-grid">
            {items.map((item) => (
              <div key={item.id} className="menu-card">
                <img src={item.image} alt={item.name} className="menu-img" />
                <h3 className="menu-name">{item.name}</h3>
                <p className="menu-price">₹{item.price}</p>
                <button
                  className="add-btn"
                  onClick={() => addToCart(item)}
                >
                  Add +
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
