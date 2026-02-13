import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import PrivateRoute from "./pages/PrivateRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);

      if (exist) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }

      navigate("/cart");
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  return (
    <>
      <Navbar cart={cart} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResult addToCart={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu addToCart={addToCart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart
                cart={cart}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeFromCart={removeFromCart}
              />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}
