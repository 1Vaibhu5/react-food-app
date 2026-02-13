import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post('/auth/register', formData);
      
      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem("foodbite_auth", "true");
      
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>

      <form onSubmit={handleRegister} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
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