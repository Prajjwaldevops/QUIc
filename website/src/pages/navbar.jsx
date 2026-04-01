import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

  const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
          <li><NavLink to="/faculty">Faculty</NavLink></li>
          <li><NavLink to="/newsletter">Newsletter</NavLink></li>
          {/* <li><NavLink to="/gallery">Gallery</NavLink></li>
          <li><NavLink to="/courseStructure">Course Structure</NavLink></li> */}

          <li
  className={`dropdown ${dropdownOpen ? "active" : ""}`}
  onClick={() => setDropdownOpen(!dropdownOpen)}
>
  <span>Others ▾</span>

  <ul className="dropdown-menu">
    <li><NavLink to="/gallery">Gallery</NavLink></li>
    <li><NavLink to="/courseStructure">Course Structure</NavLink></li>
  </ul>
</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
