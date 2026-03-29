import React, { useEffect, useState } from "react";
import "../styles/quimica23.css";
import "../styles/homePage.css";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

// ✅ FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Quimica23 = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const events = [
    {
      title: "ELEMENTAX",
      date: "March 11, 2026",
      description:
        "Solve real-world chemical engineering problems in teams.",
      image: "/assets/ElementaX.jpg",
    },
    {
      title: "JEOPARDY",
      date: "March 12, 2026",
      description:
        "Algorithmic problem-solving competition for enthusiasts.",
      image: "/assets/Jeopardy.jpg",
    },
  ];

  const webinar = [
    {
      title: "WEBINAR 1",
      date: "March 11, 2026",
      description:
        "Solve real-world chemical engineering problems in teams.",
      image: "/assets/webinar7.jpg",
      watch:
        "https://www.youtube.com/live/fZQnUwyNVJs?si=bxuGibLD8p1SrUxm",
    },
    {
      title: "WEBINAR 2",
      date: "March 12, 2026",
      description:
        "Algorithmic problem-solving competition for enthusiasts.",
      image: "/assets/webinar6.jpg",
      watch:
        "https://www.youtube.com/live/cE4Al055p9M?si=WUcP9lw-tS95Asym",
    },
    {
      title: "WEBINAR 3",
      date: "March 12, 2026",
      description:
        "Algorithmic problem-solving competition for enthusiasts.",
      image: "/assets/webinar5.jpg",
      watch:
        "https://www.youtube.com/live/mu9tLbsFHcQ?si=OQ7JdmCmoTENz_Fe",
    },
    {
      title: "WEBINAR 4",
      date: "March 12, 2026",
      description:
        "Algorithmic problem-solving competition for enthusiasts.",
      image: "/assets/webinar4.jpg",
      watch:
        "https://www.youtube.com/live/CmPI44QQa9A?si=n2qY6uKn6-Q8nK90",
    },
  ];
useEffect(() => {
  window.scrollTo(0, 0);

  const reveals = document.querySelectorAll(".reveal");

  const handleScroll = () => {
    reveals.forEach((el) => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  return (
    <div className="events-page">
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO ================= */}
      {/* <section className="hero">
        <h1>Our Exciting Events</h1>
        <p>
          Join us for a series of competitions, workshops, and quizzes
          designed for chemical engineering enthusiasts!
        </p>
      </section> */}

       <section className="team-hero reveal reveal-top">
        <h1>Our Exciting Events</h1>
        <p> Join us for a series of competitions, workshops, and quizzes
          designed for chemical engineering enthusiasts!</p>
      </section>


      {/* ================= FEATURED EVENT ================= */}
      <section className="featured-event">
        <div className="featured-image">
          <img src="/assets/Quimica23.jpg" alt="QUIMICA'23" />
        </div>

        <div className="featured-info">
          <h2>QUIMICA'23</h2>
          <p>
            Test your chemical engineering knowledge in a timed quiz
            designed to push your concepts and analytical thinking.
          </p>
          <p className="date">March 10, 2026</p>
        </div>
      </section>

      {/* ================= EVENTS ================= */}
      <section className="event-grid">
        {events.map((event, idx) => (
          <div className="event-card" key={idx}>
            <img src={event.image} alt={event.title} />
            <h4>{event.title}</h4>
            <p>{event.description}</p>
          </div>
        ))}
      </section>

      {/* ================= WEBINARS ================= */}
      <section className="event-grid">
        {webinar.map((webinar, idx) => (
          <div className="event-card" key={idx}>
            <img src={webinar.image} alt={webinar.title} />
            <h4>{webinar.title}</h4>
            <p>{webinar.description}</p>
            <a
              href={webinar.watch}
              target="_blank"
              rel="noopener noreferrer"
              className="watch-btn"
            >
              WATCH
            </a>
          </div>
        ))}
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};

export default Quimica23;