import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="text-center">Login</h2>
        <form onSubmit={formHandler}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100">
              Login Now
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/signup">Signup</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
