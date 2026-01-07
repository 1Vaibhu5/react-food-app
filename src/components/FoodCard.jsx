// src/components/Foodcard.jsx
import React from "react";

function Foodcard({ item, addToCart }) {
  // function Foodcard({ item, handleAdd }) {

  // const handleAddToCart = () => {
  //   const isLoggedIn = localStorage.getItem("loggedIn");

  //   if (!isLoggedIn) {
  //     alert("Please login to add items.");
  //     return;
  //   }

  //   handleAdd(item);
  };
  return (
     <div className="food-card">
      <h3>{item.name}</h3>
      <p>₹{item.price}</p>

      <button onClick={() => addToCart(item)}>
        Add to Cart
      </button>
    </div>
    // <div style={styles.card}>
    //   <img src={item.image} alt={item.name} style={styles.img} />

    //   <h3 style={styles.title}>{item.name}</h3>
    //   <p style={styles.price}>₹ {item.price}</p>

    //   <button style={styles.btn} onClick={() => addToCart(item)}>
    //     Add to Cart
    //   </button>
    // </div>
  );

const styles = {
  card: {
    width: "260px",
    padding: "15px",
    borderRadius: "14px",
    textAlign: "center",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: "0.3s ease",
    cursor: "pointer",
  },

  img: {
    width: "100%",
    height: "170px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "10px",
  },

  title: {
    fontSize: "20px",
    fontWeight: "600",
    margin: "8px 0",
  },

  price: {
    fontSize: "18px",
    color: "#ff6b00",
    marginBottom: "12px",
    fontWeight: "bold",
  },

  btn: {
    width: "100%",
    padding: "10px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
export default Foodcard
