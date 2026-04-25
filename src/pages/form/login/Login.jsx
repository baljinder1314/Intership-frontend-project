import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../formContainer/FormContainer";
import api from "../../../api/api";
import { addUser } from "../../../slices/userSlice";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setLoading(true);

    try {
      const response = await api.post("/login", formData);
      
      dispatch(addUser(response?.data));
      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message || // your AppError message
        error.response?.data || // plain string response
        error.message || // network error
        "Something went wrong";

      toast.error(message);
    }

    setLoading(false);
  };

  return (
    <FormContainer>
      <Toaster  position="top-right" />
      <form
        onSubmit={handleSubmit}
        noValidate
        className={`p-4 d-flex flex-column flex-grow-1 needs-validation ${
          validated ? "was-validated" : ""
        }`}
      >
        <h2 className="signup-title fw-medium mb-1">Welcome Back</h2>
        <p className="signup-subtitle mb-4">Login to continue your account</p>

        {/* Email */}
        <div className="mb-3">
          <label
            htmlFor="email"
            className="signup-label form-label text-uppercase fw-medium"
          >
            Email Address
          </label>

          <input
            type="email"
            id="email"
            name="email"
            className="form-control signup-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="invalid-feedback">Please enter valid email.</div>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label
            htmlFor="password"
            className="signup-label form-label text-uppercase fw-medium"
          >
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="form-control signup-input"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />

          <div className="invalid-feedback">Password is required. (minimu 8 characters)</div>
        </div>

        {/* Show Password */}
        <div className="form-check mb-4">
          <input
            type="checkbox"
            className="form-check-input signup-checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />

          <label
            className="form-check-label signup-check-label"
            htmlFor="showPassword"
          >
            Show Password
          </label>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn signup-btn-primary text-light w-100 fw-medium mb-3"
          style={{ backgroundColor: "#111827" }}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* Footer */}
        <div className="mt-auto">
          <p className="signup-footer-text text-center mb-0">
            Don’t have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </FormContainer>
  );
}

export default Login;
