import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const savedEmail = localStorage.getItem("reg_email");
    const savedPassword = localStorage.getItem("reg_password");

    if (email === savedEmail && password === savedPassword) {
      localStorage.setItem("foodbite_auth", "true");
      alert("Login Successful!");
      navigate("/");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "80px auto",
    padding: "40px 30px",
    textAlign: "center",
    borderRadius: "16px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },
  heading: {
    marginBottom: "30px",
    fontSize: "32px",
    color: "#ff512f",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: "14px",
    fontSize: "18px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg, #ff512f, #dd2476)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
