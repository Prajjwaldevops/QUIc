

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
          <h2>CONTACT <span style={{color:"#ff7a00"}}>US</span></h2>
          <p>KARTIK KUMAR (2K22) <p> +91 9142779272</p></p>
          <p>RAJ KUMAR BARNWAL (2K23) <p>+91 7667010887</p></p>
          {/* <p>PRAJJWAL JHA (2K24) <p>+91 6204413032</p></p> */}
        </div>
      </footer>
    </div>
  );
};

export default Footer;