import React, { useState } from "react";
import "./Checkout.css";

export default function Checkout({ cart }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = (e) => {
    e.preventDefault();
    alert("✅ Order Placed Successfully!");
  };

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <h2>🚚 Delivery Details</h2>

        <form onSubmit={placeOrder}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Mobile Number"
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Full Address"
            onChange={handleChange}
            required
          />

          <div className="row">
            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              required
            />
            <input
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              required
            />
          </div>

          <div className="total-box">
            Total Payable: ₹{total}
          </div>

          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
}
