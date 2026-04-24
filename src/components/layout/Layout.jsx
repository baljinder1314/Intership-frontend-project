import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar /> {/* ← top */}
      <main className="flex-grow-1">
        <Outlet /> {/* ← page content */}
      </main>
      <Footer /> {/* ← bottom */}
    </div>
  );
}

export default Layout;
