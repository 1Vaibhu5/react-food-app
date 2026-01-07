import React from "react";
import { useLocation } from "react-router-dom";
import MenuData from "./MenuData";
import "./Menu.css";

export default function SearchResult({ addToCart }) {
  const location = useLocation();
  const searchText = location.state?.searchText?.trim() || "";

  const allItems = Object.values(MenuData).flat();

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="menu-page">
      <h2 className="menu-title" style={{ textAlign: "center" }}>
        Search Results for:{" "}
        <span style={{ color: "red" }}>{searchText}</span>
      </h2>

      <div className="menu-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div key={item.id + index} className="menu-card">
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
          ))
        ) : (
          <h3 style={{ color: "gray", textAlign: "center" }}>
            ❌ No items found
          </h3>
        )}
      </div>
    </div>
  );
}
