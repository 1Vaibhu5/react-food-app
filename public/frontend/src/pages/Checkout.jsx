import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Checkout.css";

export default function Checkout({ cart }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);

  const subTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryCharge = cart.length > 0 ? 50 : 0;
  const tax = Math.round(subTotal * 0.05);
  const grandTotal = subTotal + deliveryCharge + tax;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: cart,
        deliveryDetails: form,
        paymentInfo: {
          subTotal,
          deliveryCharge,
          tax,
          grandTotal,
        },
      };

      const { data } = await API.post('/orders', orderData);
      
      alert("✅ Order Placed Successfully! Check your email for confirmation.");
      
      // Clear cart from localStorage
      localStorage.removeItem('cart');
      
      navigate('/');
      window.location.reload(); // Reload to clear cart state
    } catch (error) {
      alert(error.response?.data?.message || "Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <h2>🚚 Delivery Details</h2>

        <form onSubmit={placeOrder}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Mobile Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Full Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <div className="row">
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
            />
            <input
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="total-box">Total Payable: ₹{grandTotal}</div>

          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
}