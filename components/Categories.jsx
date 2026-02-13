import React from "react";
import "./Categories.css";
import categories from "../pages/CategoriesData";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  const openCategory = (name) => {
    navigate(`/menu?category=${name}`);
  };

  return (
    <div className="categories-container">
      <h2>Order our best food options</h2>
      <div className="categories-list">
        {categories.map((item) => (
          <div
            key={item.id}
            className="category-card"
            onClick={() => openCategory(item.name)}
          >
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
