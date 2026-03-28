// import React, { useEffect } from "react";
// import "../styles/homePage.css";
// import { useNavigate } from "react-router-dom";

// // ✅ Correct React FontAwesome imports
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebookF, faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons";

// const HomePage = () => {

//   const navigate = useNavigate();

//   useEffect(() => {
//     const sections = document.querySelectorAll(".fade-section");

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("visible");
//           } else {
//             entry.target.classList.remove("visible");
//           }
//         });
//       },
//       { threshold: 0.2 }
//     );

//     sections.forEach((section) => observer.observe(section));

//     return () => {
//       sections.forEach((section) => observer.unobserve(section));
//     };
//   }, []);

//   return (
//     <div className="homepage">

//       {/* NAVBAR */}
//       <nav className="navbar">
//         <div className="logo">
//           <img
//             src="/quimicaLogo.png"
//             alt="QUIMICA Logo"
//             className="navbar-logo"
//           />
//           <span>QUIMICA</span>
//         </div>

//         {/* Hamburger */}
//         <div
//           className="hamburger"
//           onClick={() =>
//             document.querySelector(".nav-links").classList.toggle("active")
//           }
//         >
//           ☰
//         </div>

//         <ul className="nav-links">
//           <li><a href="#home">Home</a></li>
//           <li><a href="#about">About</a></li>
//           <li><a onClick={()=>navigate("/events")}>Events</a></li>
//           <li><a onClick={() => navigate("/ourTeam")}>Our Team</a></li>
//           <li><a onClick={() => navigate("/contact")}>Contact</a></li>
//         </ul>
//       </nav>

//       {/* HERO */}
//       <section id="home" className="hero fade-section">
//         <div className="hero-content">
//           <h1>QUIMICA 2026</h1>
//           <p>Lorem ipsum dolor sit amet consectetur.</p>
//           <a href="#events" className="btn">Explore Events</a>
//         </div>
//       </section>

//       {/* ABOUT */}
//       <section id="about" className="about fade-section">

//         <h2 className="about-main-heading">
//           Chemical Engineering Society, BIT Sindri
//         </h2>

//         <div className="about-content">
//           <img
//             src="/quimicaLogoWhite.png"
//             alt="CEA Logo"
//             className="about-logo"
//           />

//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, ratione eos! Blanditiis fugit, vitae modi veniam quasi nulla sunt. Architecto ab ea consectetur, id ullam omnis ipsum veritatis rerum doloremque nobis corporis. Dicta vel sint doloribus optio soluta dignissimos error labore quas tenetur, consequatur nihil iure, deserunt est in cumque?
//           </p>
//         </div>

//         <h2 className="about-main-heading">
//           Birsa Institute of Technology
//         </h2>

//         <div className="about-content">
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, ratione eos! Blanditiis fugit, vitae modi veniam quasi nulla sunt. Architecto ab ea consectetur, id ullam omnis ipsum veritatis rerum doloremque nobis corporis. Dicta vel sint doloribus optio soluta dignissimos error labore quas tenetur, consequatur nihil iure, deserunt est in cumque?
//           </p>
//           <img
//             src="/quimicaLogoWhite.png"
//             alt="CEA Logo"
//             className="about-logo"
//           />
//         </div>

//         <h2 className="about-main-heading">
//           Birsa Institute of Technology
//         </h2>

//         <div className="about-content">
//           <img
//             src="/quimicaLogoWhite.png"
//             alt="CEA Logo"
//             className="about-logo"
//           />

//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, ratione eos! Blanditiis fugit, vitae modi veniam quasi nulla sunt. Architecto ab ea consectetur, id ullam omnis ipsum veritatis rerum doloremque nobis corporis. Dicta vel sint doloribus optio soluta dignissimos error labore quas tenetur, consequatur nihil iure, deserunt est in cumque?
//           </p>
//         </div>

//       <div className="ourVision">
//         <h2 className="vision-heading">Our Vision</h2>

//         <p className="vision-text">
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, ratione eos! Blanditiis fugit, vitae modi veniam quasi nulla sunt. Architecto ab ea consectetur, id ullam omnis ipsum veritatis rerum doloremque nobis corporis. Dicta vel sint doloribus optio soluta dignissimos error labore quas tenetur, consequatur nihil iure, deserunt est in cumque?
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, ratione eos! Blanditiis fugit, vitae modi veniam quasi nulla sunt. Architecto ab ea consectetur, id ullam omnis ipsum veritatis rerum doloremque nobis corporis. Dicta vel sint doloribus optio soluta dignissimos error labore quas tenetur, consequatur nihil iure, deserunt est in cumque?
//         </p>
//       </div>

//       </section>

//       {/* EVENTS */}
//       <section id="events" className="events fade-section">
//         <div className="events-header">
//           <h2>Our Events</h2>
//           <a onClick={() => navigate("/events")} className="all-events-btn">ALL EVENTS</a>
//         </div>
//         <div className="event-grid">
//           <div className="card"><img src="/assets/Innoverse.jpg" alt="Innoverse" />Innoverse</div>
//           <div className="card"><img src="/assets/Smart_scape.jpg" alt="Smartscape" />Smartscape</div>
//           <div className="card"><img src="/assets/Bits_blog.jpg" alt="Bits Blog" />Bits Blog</div>
//         </div>
//       </section>

//       {/*Achievements*/}
//       <section id="achievements" className="achievements fade-section">
//         <div className="events-header">
//         <h2>Our Achievements</h2>
//         <a onClick={() => navigate("/achievements")} className="all-events-btn">ALL ACHIEVEMENTS</a>
//         </div>
//         <div className="achievements-grid">
//           <div className="card"><img src="/assets/gate_congrats.jpg" alt="gate_congrats" />Gate Rankers</div>
//           <div className="card"><img src="/assets/PSU.jpg" alt="" />PSUs</div>
//           <div className="card"><img src="/assets/Internship.jpg" alt="" />Internships</div>
//         </div>
//       </section>

//       {/*Segments*/}
//       <section id="segments" className="segments fade-section">
//         <h2>Our Segments</h2>
//         <div className="segments-grid">
//           <div className="card"><img src="/assets/Behind_the_breakthrough.jpg" alt="" />Behind the Breakthrough</div>
//           <div className="card"><img src="/assets/Then_vs_now.jpg" alt="" />Then vs Now</div>
//           <div className="card"><img src="/assets/chess.png" alt="" />CHESS</div>
//           <div className="card"><img src="/assets/chemshot.png" alt="" />Chemshot</div>
//           <div className="card"><img src="/assets/What_if.jpg" alt="" />What If?</div>
//           <div className="card"><img src="/assets/myth_vs_fact.jpg" alt="" />Myth vs Fact</div>
//         </div>
//       </section>

//       {/* CONTACT */}
//       <section id="contact" className="contact fade-section">
//         <h2>Get In Touch</h2>
//         <p>For queries related to events, sponsorship, or participation.</p>
//       </section>

//       {/* FOOTER */}
//       <footer className="custom-footer">
//         <div className="footer-top-bar"></div>

//         <div className="footer-content">

//           {/* LEFT */}
//           <div className="footer-left">
//             <img
//               src="/quimicaLogo.png"
//               alt="QUIMICA Logo"
//               className="footer-logo"
//             />
//             <h2>Chemical Engineering Society</h2>
//             <p>Department of Chemical Engineering</p>
//             <p>BIT Sindri, Dhanbad</p>
//           </div>

//           {/* CENTER */}
//           <div className="footer-center">
//             <h3>Follow Us</h3>
//             <div className="social-icons">
//               <a href="#">
//                 <FontAwesomeIcon icon={faFacebookF} />
//               </a>
//               <a href="#">
//                 <FontAwesomeIcon icon={faLinkedinIn} />
//               </a>
//               <a href="#">
//                 <FontAwesomeIcon icon={faInstagram} />
//               </a>
//             </div>
//           </div>

//           {/* RIGHT */}
//           <div className="footer-right">
//             <h2>Contact Us</h2>
//             <p>BIT Sindri</p>
//             <p>Dhanbad, India - 721302</p>
//             <p>Phone: +91-3222-255221</p>
//           </div>

//         </div>
//       </footer>

//     </div>
//   );
// };

// export default HomePage;




import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/homePage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const HomePage = () => {
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
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>

          <li><NavLink to="/events">Events</NavLink></li>
          <li><NavLink to="/ourTeam">Our Team</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-left">
          <div className="bit-pill">B.I.T SINDRI</div>

          <h1 className="title">
            <span>QUIMICA</span> 2026
          </h1>

          <div className="society-pill">
            Chemical Engineering Society
          </div>

          <div className="hero-buttons">
            <button
              className="primary-btn signin-btn"
              onClick={() => navigate("/signin")}
            >
              SIGN IN
            </button>

            <button
              className="primary-btn"
              onClick={() => navigate("/register")}
            >
              REGISTER
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="poster-box">
           <img src="/assets/department2.png" alt="BIT Sindri" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <h2 className="section-title">ABOUT US</h2>

        <div className="about-container">
          <div className="about-img-box">
            <img src="/assets/department2.png" alt="BIT Sindri" />
            <div className="location-tag">
              Office Location: MC 31 Chemical Department Building
            </div>
          </div>

          <div className="about-text-box">
            <p>
              Quimica is the annual technical Colloquium and an extended branch
              of the Chemical Engineering Department's student body.
            </p>

            <p>
              The foundation of this organization was laid by ambitious students
              and now includes Professors, Alumni, and Professionals.
            </p>

            <p>
              Significant events include Shaastra, Tech Kriti, Advaita,
              Scintilla, and career seminars.
            </p>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="events">
        <h2 className="section-title">OUR EVENTS</h2>

        {/* QUIMICA 25 */}
        <div className="event-container">
          <div className="event-poster">
            <img src="/assets/Quimica25.jpg" alt="Quimica 25" />
          </div>

          <div className="event-details">
            <h3>QUIMICA'25</h3>
            <p>
              The Chemical Engineering Society organizes an annual technical
              extravaganza at BIT Sindri.
            </p>

            <button
              className="primary-btn"
              onClick={() => navigate("/quimica25")}
            >
              EXPLORE
            </button>
          </div>
        </div>

        {/* QUIMICA 23 */}
        <div className="event-container">
          <div className="event-poster">
            <img src="/assets/Quimica23.jpg" alt="Quimica 23" />
          </div>

          <div className="event-details">
            <h3>QUIMICA'23</h3>
            <p>
              The Chemical Engineering Society organizes an annual technical
              extravaganza at BIT Sindri.
            </p>

            <button
              className="primary-btn"
              onClick={() => navigate("/quimica23")}
            >
              EXPLORE
            </button>
          </div>
        </div>
      </section>

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
            <FontAwesomeIcon icon={faFacebookF} />
            <FontAwesomeIcon icon={faLinkedinIn} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faXTwitter} />
          </div>
        </div>

        <div className="footer-right">
          <h4>CONTACT US</h4>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;