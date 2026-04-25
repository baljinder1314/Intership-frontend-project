import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../api/api";

function User() {
  const [copied, setCopied] = useState("");
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const userData = user?.data?.loggedInUser || user?.data || user?.userFinded;
  const photoRef = useRef(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmitPhoto = async () => {
    setLoading(true);
    try {
      let file = photoRef?.current?.files[0];
      const formData = new FormData();
      formData.append("profileImage", file);

      await api.post("/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      const message =
        error.response?.data?.message || // your AppError message
        error.response?.data || // plain string response
        error.message || // network error
        "Something went wrong";

      toast.error(message);
    }
    setLoading(false);
    setUploadPhoto(false);
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Toaster position="top-right" />
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
              <Link to={"/edit"} className="position-absolute  edit-btn">
                Edit
              </Link>
              <div className="card-body text-center">
                <div className="d-flex justify-content-center align-items-center">
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      overflow: "hidden",
                      borderRadius: "50%",
                      position: "relative",
                    }}
                  >
                    <img
                      src={
                        userData?.userFinded?.profileImage ||
                        userData?.profileImage ||
                        "data:image/png;base64,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"
                      }
                      alt="avatar"
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        backgroundColor: "#fff",
                      }}
                    />
                  </div>
                  <i
                    onClick={() => setUploadPhoto((prev) => !prev)}
                    className="fa-solid fa-pen-to-square"
                    style={{
                      position: "absolute",
                      color: "black",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      right: "70px",
                      top: "130px",
                      padding: "1rem",
                      fontSize: "1.5rem",
                    }}
                  ></i>
                </div>
                {uploadPhoto && (
                  <div
                    className="position-fixed d-flex flex-column flex-md-row"
                    style={{
                      zIndex: "100000",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      top: "0",
                      left: "0",
                      bottom: "0",
                      right: "0",
                      minHeight: "100%",
                      minWidth: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    {/* File Input */}
                    <input
                      type="file"
                      accept="image/*"
                      ref={photoRef}
                      style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#fff",
                        border: "2px solid #ddd",
                        borderRadius: "10px",
                        cursor: "pointer",
                        width: "300px",
                        color: "#000",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                      }}
                    />

                    <button
                      onClick={handleSubmitPhoto}
                      style={{
                        padding: "12px 22px",
                        backgroundColor: "#0d6efd",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        fontWeight: "600",
                        cursor: "pointer",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                        transition: "0.3s ease",
                      }}
                    >
                      {loading ? "Uploading..." : "Upload"}
                    </button>
                    <div
                      onClick={() => setUploadPhoto((prev) => !prev)}
                      className="fw-bold fs-3 text-white"
                    >
                      X
                    </div>
                  </div>
                )}
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
                    <p className="mb-0 flex-grow-1 me-2 text-break">
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
                    <p className="mb-0 flex-grow-1 me-2 text-break">
                      <i className="fa-brands fa-github"></i> &nbsp;
                      {userData?.socialLinks?.github ||
                        userData?.userFinded?.socialLinks?.github ||
                        "mdbootstrap"}
                    </p>
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() =>
                        copyText(
                          userData?.socialLinks?.github ||
                            userData?.userFinded?.socialLinks?.github,
                        )
                      }
                    >
                      Copy
                    </button>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0 flex-grow-1 me-2 text-break">
                      <i className="fa-brands fa-twitter"></i> &nbsp;
                      {userData?.socialLinks?.twitter ||
                        userData?.userFinded?.socialLinks?.twitter ||
                        "@mdbootstrap"}
                    </p>
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() =>
                        copyText(
                          userData?.socialLinks?.twitter ||
                            userData?.userFinded?.socialLinks?.twitter,
                        )
                      }
                    >
                      Copy
                    </button>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0 flex-grow-1 me-2 text-break">
                      <i className="fa-brands fa-instagram"></i> &nbsp;
                      {userData?.socialLinks?.instagram ||
                        userData?.userFinded?.socialLinks?.instagram ||
                        "mdbootstrap"}
                    </p>
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() =>
                        copyText(
                          userData?.socialLinks?.instagram ||
                            userData?.userFinded?.socialLinks?.instagram,
                        )
                      }
                    >
                      Copy
                    </button>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p className="mb-0 flex-grow-1 me-2 text-break">
                      <i className="fa-brands fa-facebook"></i> &nbsp;
                      {userData?.socialLinks?.facebook ||
                        userData?.userFinded?.socialLinks?.facebook ||
                        "mdbootstrap"}
                    </p>
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() =>
                        copyText(
                          userData?.socialLinks?.facebook ||
                            userData?.userFinded?.socialLinks?.facebook,
                        )
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
                  [
                    "Full Name",
                    userData?.fullName || userData?.userFinded?.fullName,
                  ],
                  ["Email", userData?.email || userData?.userFinded?.email],
                  ["Phone", userData?.phone || userData?.userFinded?.phone],
                  [
                    "Address",
                    userData?.address || userData?.userFinded?.address,
                  ],
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
