import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart({ cart, increaseQty, decreaseQty, removeFromCart }) {
  const navigate = useNavigate();

  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const deliveryCharge = cart.length > 0 ? 50 : 0;
  const tax = Math.round(subTotal * 0.05); // 5% GST
  const grandTotal = subTotal + deliveryCharge + tax;

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>🛒 Cart is Empty</h2>
        <button onClick={() => navigate("/menu")}>Go to Menu</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Order Bill</h2>

      <table className="bill-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>❌</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>₹{item.price}</td>
              <td>
                <div className="qty-box">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </td>
              <td>₹{item.price * item.qty}</td>
              <td>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* BILL SUMMARY */}
      <div className="bill-summary">
        <p>Subtotal: <b>₹{subTotal}</b></p>
        <p>Delivery Charges: <b>₹{deliveryCharge}</b></p>
        <p>GST (5%): <b>₹{tax}</b></p>
        <h3>Grand Total: ₹{grandTotal}</h3>

        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
