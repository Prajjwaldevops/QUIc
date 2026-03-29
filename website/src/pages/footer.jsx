

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";


  const Footer = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="home">

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-left">
          <img src="/quimicaLogoWhite.png" alt="logo" />
          <h4>CHEMICAL ENGINEERING SOCIETY</h4>
          <p>Department of Chemical Engineering</p>
        </div>

        <div className="footer-center">
          <h4>FOLLOW</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/quimicabits" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="https://www.linkedin.com/company/quimica-bit-sindri/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="https://www.instagram.com/quimicabits_blog/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://x.com/Quimica_BITS" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faXTwitter} /></a>
          </div>
        </div>

        <div className="footer-right">
          <h4>CONTACT US</h4>
          <h3>KARTIK KUMAR <h5>+91 9142779272</h5></h3>
          <h3>RAJ KUMAR BARNWAL <h5>+91 7667010887</h5></h3>
        </div>
      </footer>
    </div>
  );
};

export default Footer;