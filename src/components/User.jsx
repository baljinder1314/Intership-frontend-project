import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function User() {
  const [copied, setCopied] = useState("");
  const user = useSelector((state) => state.auth.user);
  const userData = user?.data?.loggedInUser || user?.data || user?.userFinded;

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied("Copied Successfully ✅");

      setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch (error) {
      setCopied("Failed To Copy ❌");
    }
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      {/* Message */}
      {copied && (
        <div className="alert alert-success position-absolute z-3 w-100 text-center shadow-sm">
          {copied}
        </div>
      )}

      <div className="container py-5">
        <div className="row">
          <div className="col"></div>
        </div>

        <div className="row">
          {/* Left Side */}
          <div className="col-lg-4">
            <div className="card mb-4 position-relative">
              <Link to={"/edit"} className="position-absolute edit-btn">
                Edit
              </Link>
              <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "150px" }}
                />
                <h5 className="my-3">
                  {userData?.userFinded?.username || userData?.username}
                </h5>
                <p className="text-muted mb-1">
                  {userData?.userFinded?.profession || userData?.profession}
                </p>
                <p className="text-muted mb-4">
                  {userData?.userFinded?.address || userData?.address}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0">
                      <i className="fa-solid fa-earth-americas"></i> &nbsp;
                      {userData?.socialLinks?.website ||
                        userData?.userFinded?.socialLinks?.website ||
                        "https://mdbootstrap.com"}
                    </p>
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() =>
                        copyText(
                          userData?.socialLinks?.website ||
                            userData?.userFinded?.userFinded?.socialLinks
                              ?.website,
                        )
                      }
                    >
                      Copy
                    </button>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0">
                      <i className="fa-brands fa-github"></i> &nbsp;
                      {userData?.socialLinks?.github || userData?.userFinded?.socialLinks?.github ||
                        "mdbootstrap"}
                    </p>
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() =>
                        copyText(userData?.socialLinks?.github || userData?.userFinded?.socialLinks?.github)
                      }
                    >
                      Copy
                    </button>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0">
                      <i className="fa-brands fa-twitter"></i> &nbsp;
                      {userData?.socialLinks?.twitter || userData?.userFinded?.socialLinks?.twitter ||
                        "@mdbootstrap"}
                    </p>
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() =>
                        copyText(userData?.socialLinks?.twitter || userData?.userFinded?.socialLinks?.twitter)
                      }
                    >
                      Copy
                    </button>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0">
                      <i className="fa-brands fa-instagram"></i> &nbsp;
                      {userData?.socialLinks?.instagram || userData?.userFinded?.socialLinks?.instagram ||
                        "mdbootstrap"}
                    </p>
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() =>
                        copyText(userData?.socialLinks?.instagram || userData?.userFinded?.socialLinks?.instagram)
                      }
                    >
                      Copy
                    </button>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0">
                      <i className="fa-brands fa-facebook"></i> &nbsp;
                      {userData?.socialLinks?.facebook || userData?.userFinded?.socialLinks?.facebook ||
                        "mdbootstrap"}
                    </p>
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() =>
                        copyText(userData?.socialLinks?.facebook || userData?.userFinded?.socialLinks?.facebook)
                      }
                    >
                      Copy
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                {[
                  ["Full Name",userData?.fullName || userData?.userFinded?.fullName],
                  ["Email",userData?.email || userData?.userFinded?.email],
                  ["Phone",userData?.phone || userData?.userFinded?.phone],
                  ["Address", userData?.address ||  userData?.userFinded?.address],
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">{item[0]}</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{item[1]}</p>
                      </div>
                    </div>
                    {index !== 3 && <hr />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Progress Cards
            <div className="row">
              {[1, 2].map((card) => (
                <div className="col-md-6" key={card}>
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4">
                        <span className="text-primary font-italic me-1">
                          assignment
                        </span>{" "}
                        Project Status
                      </p>

                      {[
                        ["Web Design", 80],
                        ["Website Markup", 72],
                        ["One Page", 89],
                        ["Mobile Template", 55],
                        ["Backend API", 66],
                      ].map((skill, index) => (
                        <div key={index}>
                          <p
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          >
                            {skill[0]}
                          </p>

                          <div
                            className="progress rounded"
                            style={{ height: "5px" }}
                          >
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: `${skill[1]}%` }}
                              aria-valuenow={skill[1]}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default User;
