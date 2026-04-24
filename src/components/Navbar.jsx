import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../slices/userSlice";
import api from "../api/api";

function Navbar() {
  const user = useSelector((state) => state.auth.user);

  const userData = user?.data?.loggedInUser || user?.data || user?.userFinded;
  
    console.log()
    
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const handleLogout = async (e) => {
    try {
      const data = await api.post("/logout");

      dispatch(removeUser());
      navigate("/login");
      localStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-dark navbar-dark px-4 py-4 ">
      <div className="d-flex align-items-center">
        <div className="">
          <Link className="navbar-brand h6 " to="/">
            MyApp
          </Link>
        </div>
        <div className="">
          <Link className="text-light text-decoration-none h6 p-1" to={"/user"}>Me</Link>
        </div>
      </div>
      <div className="ms-auto d-flex gap-3 align-items-center">
        <span className="text-white">Hello, {userData?.userFinded?.username || userData?.username}</span>
        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
