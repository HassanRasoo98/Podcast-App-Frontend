// export default Signup;
import {React, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      // console.log(formData);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        toast.success("Registration successful");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };


//   const handleSignup = (event) => {
//     event.preventDefault();
//     // Add your signup logic here (e.g., form validation, API call)
//     navigate("/dashboard"); // Navigate to Dashboard after successful signup
//   };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="text-center">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100">
              Signup Now
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p>
            Already Have An Account? <Link to="/login">Login</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
