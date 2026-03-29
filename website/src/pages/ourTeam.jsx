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

  const team22 = [
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

  const team23 = [
    { name: "KUMAR ANJANI GAURAV", batch: "2k23", image: "/assets/team23/anjanisir.jpg", linkedIn: "https://www.linkedin.com/in/kumar-anjani-gaurav-016693287/" },
    { name: "ANUPRIYA KUMARI", batch: "2k23", image: "/assets/team23/anupriyamam.jpg", linkedIn: "https://www.linkedin.com/in/anupriya-kumari-251b29290/" },
    { name: "BABAN KUMAR GUPTA", batch: "2k23", image: "/assets/team23/babansir.jpeg", linkedIn: "https://www.linkedin.com/in/baban-kumar-gupta-b82b44290/" },
    { name: "BITTU KUMAR", batch: "2k23", image: "/assets23/team/bittusir.jpg", linkedIn: "https://www.linkedin.com/in/bittukumar7277/" },
    { name: "GOURAV KUMAR", batch: "2k23", image: "/assets/team23/gouravsir.jpeg", linkedIn: "https://www.linkedin.com/in/gourav-kumar-gk/" },
    { name: "HARSH KASHYAP", batch: "2k23", image: "/assets23/team/harshsir.jpg", linkedIn: "https://www.linkedin.com/in/harsh-kashyap-07b624290/" },
    { name: "HARSHIT RAI", batch: "2k23", image: "/assets/team23/harshitsir.jpeg", linkedIn: "https://www.linkedin.com/in/harshit-rai-26b7a7282/" },
    { name: "JIYA RANI", batch: "2k23", image: "/assets/team23/jiyamam.jpg", linkedIn: "https://www.linkedin.com/in/jiya-rani-010aa0290/" },
    { name: "PALAK PRIYA", batch: "2k23", image: "/assets/team23/palakmam.jpg", linkedIn: "https://www.linkedin.com/in/palak-priya-54b7891b6/" },
    { name: "PAYAL JAISWAL", batch: "2k23", image: "/assets/team23/payalmam.jpeg", linkedIn: "https://www.linkedin.com/in/payal-jaiswal-b7bb0a293/" },
    { name: "RAJ KUMAR BARNWAL", batch: "2k23", image: "/assets/team23/rajsir.jpeg", linkedIn: "https://www.linkedin.com/in/raj-kumar-barnwal-2347351b5/" },
    { name: "ROSHNI KUMARI", batch: "2k23", image: "/assets/team23/roshnimam.jpg", linkedIn: "https://www.linkedin.com/in/roshni-kumari-8408182a7/" },
    { name: "SACHIN KARMALI", batch: "2k23", image: "/assets/team23/sachinsir.jpg", linkedIn: "https://www.linkedin.com/in/sachin-karmali-19ab55290/" },
    { name: "SAMBHAV PRATAP SINGH", batch: "2k23", image: "/assets/team23/sambhavsir.jpeg", linkedIn: "https://www.linkedin.com/in/sambhav-pratap-singh-0b4b86290/" },
    { name: "SANSKAR SINGH RAJ", batch: "2k23", image: "/assets/team23/sanskarsir.jpg", linkedIn: "https://www.linkedin.com/in/sanskar-raj-singh-4577172a3/" },
    { name: "SATISH KUMAR SAH", batch: "2k23", image: "/assets/team23/satishsir.jpg", linkedIn: "https://www.linkedin.com/in/satishsah9944/" },
    { name: "SUJAL KUMAR", batch: "2k23", image: "/assets/team23/sujalsir.jpg", linkedIn: "https://www.linkedin.com/in/sujal-kumar-48b60b290/" },
  ];

  const team24 = [
    { name: "ABHAVYA RANJAN", batch: "2k24", image: "/assets/team24/abhavya.jpeg", linkedIn: "https://www.linkedin.com/in/abhavya-ra17229207/" },
    { name: "ADITI PRIYA",batch: "2k24", image: "/assets/team24/aditi.jpeg", linkedIn: "https://www.linkedin.com/in/aditi-priya-3ab776333/" },
    { name: "ASHIKA KUMARI", batch: "2k24", image: "/assets/team24/ashika.jpeg", linkedIn: "https://www.linkedin.com/in/ashika-kumari-638b81338/" },
    { name: "KUMARI SHALINI", batch: "2k24", image: "/assets/team24/shalini.jpeg", linkedIn: "https://www.linkedin.com/in/kumari-shalini-505146325/" },
    { name: "MOHIT KUMAR", batch: "2k24", image: "/assets/team24/mohit.jpeg", linkedIn: "https://www.linkedin.com/in/mohit-kumar-baa375335/" },
    { name: "NEEL RAJ GUPTA", batch: "2k24", image: "/assets/team24/neel.jpg", linkedIn: "https://www.linkedin.com/in/neel-raj-gupta-b6b4b633a/" },
    { name: "NIKHIL JAMES LAKRA", batch: "2k24", image: "/assets/team24/nikhilj.jpeg", linkedIn: "" },
    { name: "NIKHIL KUMAR MAHATO", batch: "2k24", image: "/assets/team24/nikhilm.jpeg", linkedIn: "https://www.linkedin.com/in/nikhil-m-432002307/" },
    { name: "PRAJJWAL JHA", batch: "2k24", image: "/assets/team24/prajjwal.jpg", linkedIn: "https://www.linkedin.com/in/prajjwal-jha-98476133b/" },
    { name: "PRATIBHAA KUMARI", batch: "2k24", image: "/assets/team24/pratibhaa.jpg", linkedIn: "https://www.linkedin.com/in/pratibha-kumari-ab7306267/" },
    { name: "PRATIKA KUMARI", batch: "2k24", image: "/assets/team24/pratika.jpeg", linkedIn: "https://www.linkedin.com/in/pratika-kumari-061313v/" },
    { name: "PRIYA KUMARI", batch: "2k24", image: "/assets/team24/priya.jpg", linkedIn: "https://www.linkedin.com/in/priya-kumari-a26aa8315/" },
    { name: "PRIYANSHI KUMARI", batch: "2k24", image: "/assets/team24/priyanshi.jpg", linkedIn: "https://www.linkedin.com/in/priyanshi-kumari-9b94a2276/" },
    { name: "RAHUL KUMAR", batch: "2k24", image: "/assets/team24/rahul.jpeg", linkedIn: "https://www.linkedin.com/in/rahul-kumar-419bbb333/" },
    { name: "RAJ KRISHNA VATS", batch: "2k24", image: "/assets/team24/raj.jpg", linkedIn: "https://www.linkedin.com/in/rajvats2028/" },
    { name: "RAVI KUMAR MAHATO", batch: "2k24", image: "/assets/team24/ravi.png", linkedIn: "https://www.linkedin.com/in/ravi-kumar-b5a1b230a/" },
    { name: "ROSHAN PANDIT", batch: "2k24", image: "/assets/team24/roshan.png", linkedIn: "" },
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
      <h1 className="teamtext">OUR POST BEARERS</h1>
      <section className="team-container">
      
        {team22.map((member, idx) => (
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

      <h1 className="teamtext">TEAM 2K23</h1>
      <section className="team-container">
        {team23.map((member, idx) => (
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

      <h1 className="teamtext">TEAM 2K24</h1>
      <section className="team-container">
        

        {team24.map((member, idx) => (
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