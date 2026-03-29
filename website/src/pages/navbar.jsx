import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

  const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="home">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <img src="/quimicaLogoWhite.png" alt="logo" />
          <h2>QUIMICA</h2>
        </div>

        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/events">Events</NavLink></li>
          <li><NavLink to="/ourTeam">Our Team</NavLink></li>
          <li><NavLink to="/contact">Faculty</NavLink></li>
          <li><NavLink to="/newsletter">Newsletter</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;