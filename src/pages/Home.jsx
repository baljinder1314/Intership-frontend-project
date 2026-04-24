import React from "react";
import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
        
      <section className="container py-2">
        <div className="row align-items-center min-vh-100">
          {/* Left Side */}
          <div className="col-lg-6">
            <span className="badge bg-primary px-3 py-2 mb-3 rounded-pill">
              🚀 Modern Developer Platform
            </span>

            <h1 className="display-2 fw-bold mb-4">
              Build Your
              <span className="text-primary d-block">Dream Portfolio</span>
            </h1>

            <p className="text-muted fs-5 mb-4">
              Showcase your skills, projects, coding journey and become visible
              to recruiters & companies.
            </p>

            <div className="d-flex gap-3 flex-wrap">
              <Link
                to="/signup"
                className="btn btn-primary btn-lg px-4 rounded-pill"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="btn btn-outline-dark btn-lg px-4 rounded-pill"
              >
                Explore
              </Link>
            </div>

            {/* Stats */}
            <div className="row mt-5">
              <div className="col-4">
                <h3 className="fw-bold">10K+</h3>
                <p className="text-muted small">Users</p>
              </div>

              <div className="col-4">
                <h3 className="fw-bold">25K+</h3>
                <p className="text-muted small">Projects</p>
              </div>

              <div className="col-4">
                <h3 className="fw-bold">99%</h3>
                <p className="text-muted small">Success</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900"
                alt="developer"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container pb-5">
        <div className="row g-4">
          {[
            {
              title: "Beautiful Profile",
              text: "Create stunning developer profiles instantly.",
            },
            {
              title: "Show Projects",
              text: "Upload and highlight your best work.",
            },
            {
              title: "Get Hired",
              text: "Let recruiters discover your talent.",
            },
          ].map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <h4 className="fw-bold">{item.title}</h4>
                <p className="text-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
