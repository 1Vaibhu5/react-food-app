import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Card from "./pages/Card";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/card"
          element={
            <PrivateRoute>
              <Card />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

