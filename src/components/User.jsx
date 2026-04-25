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
  const [UpdatePhoto, setUpdatePhoto] = useState("");

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

      const response = await api.post("/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUpdatePhoto(response?.data?.data?.profileImage);
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
                        UpdatePhoto ||
                        userData?.profileImage ||
                        userData?.userFinded?.profileImage
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
                            userData?.userFinded?.socialLinks?.website, // ✅ Single reference
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
