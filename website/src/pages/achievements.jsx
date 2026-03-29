
import React, { useEffect } from "react";
import "../styles/achievements.css";
import "../styles/homePage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const Achievements = () => {
  const navigate = useNavigate();

    useEffect(() => {
    window.scrollTo(0, 0);
     }, []);

  // Hamburger toggle for mobile
  useEffect(() => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    const toggleNav = () => {
      navLinks.classList.toggle("active");
    };

    hamburger.addEventListener("click", toggleNav);

    return () => {
      hamburger.removeEventListener("click", toggleNav);
    };
  }, []);

  const internships = [
    {
      title: "TATA STEEL",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/Internship.jpg",
    },
    {
      title: "WOM - TATA STEEL",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/wom.jpg",
    },
    {
      title: "TECHNIP 2025",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/technip.jpg",
    },
    {
      title: "RIL 2025",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/ril2025.jpg",
    },
  ];

    const others = [
      {
      title: "QUIMICA'25",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/Competition.jpg",
    },
  ];

    const psu = [
    {
      title: "QUIMICA'25",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/PSU.jpg",
    },
    {
      title: "QUIMICA'25",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/PSU2.jpg",
    },
    {
      title: "QUIMICA'25",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/PSU3.jpg",
    },
    {
      title: "QUIMICA'25",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/PSU4.jpg",
    },
    {
      title: "QUIMICA'25",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/PSU5.jpg",
    },
    {
      title: "QUIMICA'25",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/PSU6.jpg",
    },
  ];

    const exams = [
      {
      title: "QUIMICA'25",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/gate_congrats.jpg",
    },
    {
      title: "QUIMICA'25",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/gate2025.jpg",
    },
    {
      title: "QUIMICA'25",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/Exam.jpg",
    },
    {
      title: "QUIMICA'25",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/Exam2.jpg",
    },
    {
      title: "QUIMICA'25",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/Exam3.jpg",
    },
    {
      title: "QUIMICA'25",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/Exam4.jpg",
    },
    {
      title: "QUIMICA'25",
      description: "Test your chemical engineering knowledge in a timed quiz.",
      image: "/assets/gate_congrats2.jpg",
    },
  ];



  return (
    <div className="events-page">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="events-header">
          <h1>Our Acheivements</h1>
          <div className="achievements-btn">
          <a href="#internships" className="all-events-btn">INTERNSHIPS</a>
          <a href="#psu" className="all-events-btn">PSUs</a>
          <a href="#exams" className="all-events-btn">COMPETATIVE EXAMS</a>
          <a href="#others" className="all-events-btn">OTHERS</a>
          </div>
        </div>
        <p>Join us for a series of competitions, workshops, and quizzes designed for chemical engineering enthusiasts!</p>
      </section>

        {/* Internships */}
      <section id="internships"><h1>INTERNSHIPS</h1></section>

      <section className="event-grid">
      {internships.map((internships, idx) => (
        <div className="event-card" key={idx}>
          <img src={internships.image} alt={internships.title} />
          <h4>{internships.title}</h4>
          <p>{internships.description}</p>
      </div>
      ))}
      </section>

      {/* PSUs */}
      <section id="psu"><h1>PSUs</h1></section>

      <section className="event-grid">
      {psu.map((psu, idx) => (
        <div className="event-card" key={idx}>
          <img src={psu.image} alt={psu.title} />
          <h4>{psu.title}</h4>
          <p>{psu.description}</p>
      </div>
      ))}
      </section>

      {/* EXAMS */}
      <section id="exams"><h1>EXAMS</h1></section>

      <section className="event-grid">
      {exams.map((exams, idx) => (
        <div className="event-card" key={idx}>
          <img src={exams.image} alt={exams.title} />
          <h4>{exams.title}</h4>
          <p>{exams.description}</p>
      </div>
      ))}
      </section>

            {/* OTHERS */}

      <section id="others"><h1>OTHERS</h1></section>

      <section className="event-grid">
      {others.map((others, idx) => (
        <div className="event-card" key={idx}>
          <img src={others.image} alt={others.title} />
          <h4>{others.title}</h4>
          <p>{others.description}</p>
      </div>
      ))}
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Achievements;