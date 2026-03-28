import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/ourTeam.css";
import "../styles/homePage.css";

// ✅ FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faLinkedinIn, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const OurTeam = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const team = [
    { name: "KARTIK KUMAR", post: "PRESIDENT", batch: "2k22", image: "/assets/team/kartiksir.jpeg", linkedIn: "https://www.linkedin.com/in/kartik-kumar-550933298/" },
    { name: "HARSHITA SETH", post: "VICE PRESIDENT", batch: "2k22", image: "/assets/team/harshitamam.jpeg", linkedIn: "https://www.linkedin.com/in/harshita-seth-74b280257/" },
    { name: "SOURAV KUMAR", post: "VICE PRESIDENT", batch: "2k22", image: "/assets/team/souravsir.jpeg", linkedIn: "https://www.linkedin.com/in/sourav-kumar-2a271a256/" },
    { name: "RAVI SHANKAR PRASAD", post: "SECRETARY", batch: "2k22", image: "/assets/team/ravisir2.jpeg", linkedIn: "https://www.linkedin.com/in/ravi-shankar-prasad-bitsindri/" },
    { name: "DIKSHA", post: "JOINT SECRETARY", batch: "2k22", image: "/assets/team/dikshamam.jpeg", linkedIn: "https://www.linkedin.com/in/diksha-jha-32342628b/" },
    { name: "NIDHISHREE MAHATO", post: "JOINT SECRETARY", batch: "2k22", image: "/assets/team/nidhimam.jpg", linkedIn: "https://www.linkedin.com/in/nidhishree-mahato/" },
    { name: "KOMAL KUMARI", post: "SCHOLASTIC HEAD", batch: "2k22", image: "/assets/team/komalmam.jpeg", linkedIn: "https://www.linkedin.com/in/komalkri08/" },
    { name: "RUDRANIL GANGULY", post: "SCHOLASTIC HEAD", batch: "2k22", image: "/assets/team/rudranilsir2.jpeg", linkedIn: "https://www.linkedin.com/in/rudranil-ganguly-305411254/" },
    { name: "SAHITYA KUMAR", post: "TREASURER", batch: "2k22", image: "/assets/team/sahityasir.jpg", linkedIn: "https://www.linkedin.com/in/sahitya-kumar-897a27253/" },
    { name: "AKASH NATH", post: "JOINT TREASURER", batch: "2k22", image: "/assets/team/akashsir.jpg", linkedIn: "https://www.linkedin.com/in/theakashnath/" },
    { name: "SOURAV OMONG", post: "JOINT TREASURER", batch: "2k22", image: "/assets/team/omangsir.jpeg", linkedIn: "https://www.linkedin.com/in/sourav-omong-51655b257/" },
    { name: "HARSH GIRI", post: "TECHNICAL HEAD", batch: "2k22", image: "/assets/team/harshsir.jpg", linkedIn: "https://www.linkedin.com/in/harsh-giri-b84889211/" },
    { name: "MANOJ MURMU", post: "DESIGN & CREATIVE HEAD", batch: "2k22", image: "/assets/team/manojsir.jpg", linkedIn: "https://www.linkedin.com/in/manoj-murmu/" },
    { name: "DEEPTI KUMARI", post: "ALUMNI & OUTREACH HEAD", batch: "2k22", image: "/assets/team/deeptimam.jpeg", linkedIn: "https://www.linkedin.com/in/deepti-kumari-482049258/" },
    { name: "DONA BHATTACHARJEE", post: "ALUMNI & OUTREACH HEAD", batch: "2k22", image: "/assets/team/donamam.jpg", linkedIn: "https://www.linkedin.com/in/dona-bhattacharjee-a95b25273/" },
    { name: "SAMRIDDHI SINGH", post: "PUBLIC RELATION OFFICER", batch: "2k22", image: "/assets/team/samriddhimam.jpg", linkedIn: "" },
    { name: "AASHI RANI", post: "JOINT PRO", batch: "2k22", image: "/assets/team/aashimam.jpg", linkedIn: "https://www.linkedin.com/in/aashi-rani-a6824730a/" },
  ];

  /* ================= SCROLL REVEAL ================= */
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => {
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="homepage">
      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <div className="nav-left">
          <img src="/quimicaLogoWhite.png" alt="logo" />
          <h2>QUIMICA</h2>
        </div>

        <div
          className={`menu-icon ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/events" onClick={() => setMenuOpen(false)}>Events</NavLink></li>
          <li><NavLink to="/ourTeam" onClick={() => setMenuOpen(false)}>Our Team</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
        </ul>
      </nav>

      {/* ================= HERO ================= */}
      <section className="team-hero reveal reveal-top">
        <h1>Our Team</h1>
        <p>Meet the dedicated members of QUIMICA</p>
      </section>

      {/* ================= TEAM ================= */}
      <section className="team-container">
        {team.map((member, idx) => (
          <div className="team-card reveal reveal-left" key={idx}>
            <img src={member.image} alt={member.name} />

            {/* NORMAL CONTENT */}
            <div className="team-content">
              <h3>{member.name}</h3>
              <p>{member.post}</p>
              <p>{member.batch}</p>

              {member.linkedIn && (
                <a href={member.linkedIn} className="linkedin-icon" target="blank">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              )}
            </div>

            {/* 🔥 HOVER OVERLAY */}
            <div className="hover-overlay">
              <h3>{member.name}</h3>
              <p>{member.post}</p>
              <p>{member.batch}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer" id="contact">
        <div className="footer-left">
          <img src="/quimicaLogoWhite.png" alt="logo" />
          <h4>CHEMICAL ENGINEERING SOCIETY</h4>
          <p>Department of Chemical Engineering</p>
          <p>BIT Sindri, Dhanbad</p>
        </div>

        <div className="footer-center">
          <h4>FOLLOW</h4>
          <div className="social-icons">
            <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#"><FontAwesomeIcon icon={faXTwitter} /></a>
          </div>
        </div>

        <div className="footer-right">
          <h4>CONTACT US</h4>
          <p>BIT Sindri</p>
          <p>Dhanbad, India - 721302</p>
          <p>Phone: +91-3222-255221</p>
        </div>
      </footer>
    </div>
  );
};

export default OurTeam;