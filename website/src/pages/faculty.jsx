
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/faculty.css";
import "../styles/homePage.css";
import Navbar from "./navbar";
import Footer from "./footer";

// ✅ FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faLinkedinIn, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const Faculty = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    const team = [
    { name: "Dr. Amit Kumar Gupta", designation: "HOD and Associate Professor", batch: "2k22", image: "/assets/proffesors/AmitSir.png", linkedIn: "" },
    { name: "Dr. Amar Kumar", designation: "Assistant Professor", batch: "2k22", image: "/assets/proffesors/AmarSir.jpeg", linkedIn: "" },
    { name: "Dr. Ajay Oraon", designation: "Assistant Professor", batch: "2k22", image: "/assets/proffesors/AjaySir.png", linkedIn: "https://www.linkedin.com/in/ajay-oraon-1a7020148/" },
    { name: "Dr. Usha Kumari", designation: "Assistant Professor", batch: "2k22", image: "/assets/proffesors/UshaMam.jpeg", linkedIn: "https://www.linkedin.com/in/dr-usha-kumari-09073691/" },
    { name: "Dr. Sunil Kumar Singh", designation: "Assistant Professor", batch: "2k22", image: "/assets/proffesors/SunilSir.jpeg", linkedIn: "https://www.linkedin.com/in/sunil-kumar-singh-821a0a65/" },
    { name: "Prof. Manish Kumar", designation: "Assistant Professor", batch: "2k22", image: "/assets/proffesors/ManishSir.jpeg", linkedIn: "https://www.linkedin.com/in/prof-manish-kumar-0a9529224/" },
    { name: "Dr. Diwakar Pandey", designation: "Assistant Professor", batch: "2k22", image: "/assets/proffesors/DiwakarSir.jpeg", linkedIn: "https://www.linkedin.com/in/diwakar-pandey-b8370078/" },
    { name: "Dr. Abhishek Anand Hembrom", designation: "Assistant Professor", batch: "2k22", image: "/assets/proffesors/AbhishekSir.jpeg", linkedIn: "https://www.linkedin.com/in/dr-abhishek-anand-hembrom-6b2613a1/" },
    { name: "Dr. Ashok Kumar Baranwal", designation: "Assistant Professor", batch: "2k22", image: "/assets/proffesors/AshokSir.jpeg", linkedIn: "https://www.linkedin.com/in/ashok-baranwal-66a8a597/" },
    { name: "Dr. Nirupama Prasad", designation: "Assistant Professor", batch: "2k22", image: "/assets/proffesors/NirupamaMam.jpeg", linkedIn: "https://www.linkedin.com/in/nirupama-prasad-09b79637a/" },
    { name: "Dr. Ch. V. Raghunath", designation: "Assistant Professor", batch: "2k22", image: "/assets/proffesors/RaghuSir.jpeg", linkedIn: "https://www.linkedin.com/in/v-raghunath-chelluboyana-7a409728/" },
    { name: "Prof. Pitho Hansda", designation: "Assistant Professor", batch: "2k22", image: "/assets/proffesors/PithoSir.jpeg", linkedIn: "https://www.linkedin.com/in/pitho-hansda-348705138/" },
    { name: "Prof. Devina Ratnam ", designation: "Assistant Professor", batch: "2k22", image: "/assets/proffesors/DevinaMam.png", linkedIn: "https://www.linkedin.com/in/devina-ratnam-077757b8/" },
    { name: "Dr. Poornima Pandey", designation: "Assistant Professor", batch: "2k22", image: "/assets/proffesors/PoornimaMam.jpeg", linkedIn: "https://www.linkedin.com/in/poornima-pandey-7a2192b6/" },
  ];

  /* ================= SCROLL REVEAL ================= */
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => {
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="homepage">
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="team-hero reveal reveal-top">
        <h1>Our Faculty</h1>
        <p>Meet our Professors</p>
      </section>

      {/* ================= TEAM CARDS (NO FLIP) ================= */}
      <section className="team-container">
        {team.map((member, idx) => (
          <div className="team-card reveal reveal-left" key={idx}>
            <img src={member.image} alt={member.name} />
            <div className="team-content">
              <h3>{member.name}</h3>
              <p>{member.designation}</p>

              <a href={member.linkedIn} className="linkedin-icon" target="blank">
              <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
            
            {/* <p>{member.batch}</p> */}
                  
            {/* <img src="/quimicaLogo.png" alt="Member" /> */}

            {/* <h3>Name</h3>
            <p>Designation</p>
            <p>Lorem ipsum dolor sit amet consectetur.</p> */}

            
          </div>
        ))}
      </section>


      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};

export default Faculty;