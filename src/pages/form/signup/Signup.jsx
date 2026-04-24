import React, { useState, useEffect } from "react";
import FormContainer from "../formContainer/FormContainer";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../../slices/userSlice";
import api from "../../../api/api";
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  let dispatch = useDispatch();
  const navigate = useNavigate();

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
      const response = await api.post("/register", formData);
      console.log(response?.data);

      
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

  const HandleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <FormContainer>
      <Toaster  position="top-right" />
      <form
        onSubmit={handleSubmit}
        className={`p-4 d-flex flex-column flex-grow-1 needs-validation ${
          validated ? "was-validated" : ""
        }`}
        noValidate
      >
        <h2 className="signup-title fw-medium mb-1">Create an account</h2>
        <p className="signup-subtitle mb-4">Join us today, it's free</p>

        {/* fullName */}
        <div className="mb-3">
          <label
            htmlFor="fullName"
            className="signup-label form-label text-uppercase fw-medium"
          >
            fullName
          </label>
          <input
            onChange={HandleOnChange}
            type="text"
            id="fullName"
            name="fullName"
            className="form-control signup-input"
            minLength={3}
            required
            value={formData.fullName}
          />
            <div className="invalid-feedback">
            Username is required .
          </div>
        </div>

        {/* Username */}
        <div className="mb-3">
          <label
            htmlFor="username"
            className="signup-label form-label text-uppercase fw-medium"
          >
            Username
          </label>
          <input
            onChange={HandleOnChange}
            type="text"
            id="username"
            name="username"
            className="form-control signup-input"
            minLength={3}
            required
            value={formData.username}
          />
          <div className="invalid-feedback">
            Username is required (min 3 characters).
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label
            htmlFor="email"
            className="signup-label form-label text-uppercase fw-medium"
          >
            Email Address
          </label>
          <input
            onChange={HandleOnChange}
            type="email"
            id="email"
            name="email"
            className="form-control signup-input"
            required
            value={formData.email}
          />
          <div className="invalid-feedback">
            Please enter a valid email address.
          </div>
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
            onChange={HandleOnChange}
            value={formData.password}
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="form-control signup-input"
            minLength={8}
            required
          />
          <div className="invalid-feedback">
            Password must be at least 8 characters.
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="form-check mb-4">
          <input
            className="form-check-input signup-checkbox"
            type="checkbox"
            id="terms"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <label
            className="form-check-label signup-check-label"
            htmlFor="terms"
          >
            Show Password
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn signup-btn-primary text-light w-100 fw-medium mb-3"
          style={{ backgroundColor: "#111827" }}
        >
          {!loading ? "Create Account" : "Loading..."}
        </button>

        {/* Divider */}
        <div className="d-flex align-items-center gap-2 mb-3">
          <hr className="flex-grow-1 m-0 signup-divider" />
          <span className="signup-divider-text">or sign up with</span>
          <hr className="flex-grow-1 m-0 signup-divider" />
        </div>

        {/* Google Button */}
        <button type="button" className="btn signup-btn-secondary w-100 mb-3">
          Google
        </button>

        {/* Sign In Link */}
        <div className="mt-auto">
          <p className="signup-footer-text text-center mb-0">
            Already have an account?{" "}
            <Link to={"/login"} className="signup-link">
              Log In
            </Link>
          </p>
        </div>
      </form>
    </FormContainer>
  );
}

export default Signup;
