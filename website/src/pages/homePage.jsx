
// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "../styles/homePage.css";
// import Navbar from "./navbar";
// import Footer from "./footer";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFacebookF,
//   faLinkedinIn,
//   faInstagram,
//   faXTwitter,
// } from "@fortawesome/free-brands-svg-icons";


//   const HomePage = () => {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="home">
//       {/* NAVBAR */}
//       <nav className="navbar">
//               <div className="nav-left">
//                 <img src="/quimicaLogoWhite.png" alt="logo" />
//                 <h2>QUIMICA</h2>
//               </div>
      
//               <div
//                 className="menu-icon"
//                 onClick={() => setMenuOpen(!menuOpen)}
//               >
//                 ☰
//               </div>
      
//               <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
//                 <li><a href="#home">Home</a></li>
//                 <li><a href="#about">About</a></li>
//                 <li><NavLink to="/events">Events</NavLink></li>
//                 <li><NavLink to="/ourTeam">Our Team</NavLink></li>
//                 <li><NavLink to="/contact">Faculty</NavLink></li>
//                 <li><NavLink to="/newsletter">Newsletter</NavLink></li>
//               </ul>
//             </nav>
      

//       {/* HERO */}
//       <section className="hero" id="home">
//         <div className="hero-left">
//           <div className="bit-pill">B.I.T SINDRI</div>
//           <h1 className="title">
//             <span>QUIMICA</span> 2026
//           </h1>

//           <div className="society-pill">
//             Chemical Engineering Society
//           </div>

//           <div className="hero-buttons">
//             <button
//               className="primary-btn signin-btn"
//               onClick={() => navigate("/signin")}
//             >
//               SIGN IN
//             </button>

//             <button
//               className="primary-btn"
//               onClick={() => navigate("/register")}
//             >
//               REGISTER
//             </button>
//           </div>
//         </div>

//         <div className="hero-right">
//           <div className="poster-box">
//            <img src="/assets/department2.png" alt="BIT Sindri" />
//           </div>
//         </div>
//       </section>

//       {/* ABOUT */}
//       <section className="about" id="about">
//         <h2 className="section-title">ABOUT US</h2>

//         <div className="about-container">
//           <div className="about-img-box">
//             <img src="/assets/department2.png" alt="BIT Sindri" />
//             <div className="location-tag">
//               Office Location: MC 31 Chemical Department Building
//             </div>
//           </div>

//           <div className="about-text-box">
//             <p>
//               Quimica is the annual technical Colloquium and an extended branch
//               of the Chemical Engineering Department's student body.
//             </p>

//             <p>
//               The foundation of this organization was laid by ambitious students
//               and now includes Professors, Alumni, and Professionals.
//             </p>

//             <p>
//               Significant events include Shaastra, Tech Kriti, Advaita,
//               Scintilla, and career seminars.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* EVENTS */}
//       <section className="events">
//         <h2 className="section-title">OUR EVENTS</h2>

//         {/* QUIMICA 25 */}
//         <div className="event-container">
//           <div className="event-poster">
//             <img src="/assets/Quimica25.jpg" alt="Quimica 25" />
//           </div>

//           <div className="event-details">
//             <h3>QUIMICA'25</h3>
//             <p>
//               The Chemical Engineering Society organizes an annual technical
//               extravaganza at BIT Sindri.
//             </p>

//             <button
//               className="primary-btn"
//               onClick={() => navigate("/quimica25")}
//             >
//               EXPLORE
//             </button>
//           </div>
//         </div>

//         {/* QUIMICA 23 */}
//         <div className="event-container">
//           <div className="event-poster">
//             <img src="/assets/Quimica23.jpg" alt="Quimica 23" />
//           </div>

//           <div className="event-details">
//             <h3>QUIMICA'23</h3>
//             <p>
//               The Chemical Engineering Society organizes an annual technical
//               extravaganza at BIT Sindri.
//             </p>

//             <button
//               className="primary-btn"
//               onClick={() => navigate("/quimica23")}
//             >
//               EXPLORE
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <Footer />
//     </div>
//   );
// };

// export default HomePage;


import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/homePage.css";
import Footer from "./footer";

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
          <li><NavLink to="/contact">Faculty</NavLink></li>
          <li><NavLink to="/newsletter">Newsletter</NavLink></li>
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
            {/* <button
              className="primary-btn signin-btn"
              onClick={() => navigate("/signin")}
            >
              SIGN IN
            </button> */}

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

      {/* FOOTER (Using Component) */}
      <Footer />

    </div>
  );
};

export default HomePage;