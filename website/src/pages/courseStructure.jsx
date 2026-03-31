import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/courseStructure.css";
import Navbar from "./navbar";
import Footer from "./footer";

const CourseStructure = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const course = [
    {
      title: "FIRST SEMESTER",
      image: "/assets/sem1.jpg",
    },
    {
      title: "SECOND SEMESTER",
      image: "/assets/sem2.jpg",
    },
    {
      title: "THIRD SEMESTER",
      image: "/assets/sem3.jpg",
    },
    {
      title: "FOURTH SEMESTER",
      image: "/assets/sem4.jpg",
    },
    {
      title: "FIFTH SEMESTER",
      image: "/assets/sem5.jpg",
    },
    {
      title: "SIXTH SEMESTER",
      image: "/assets/sem6.jpg",
    },
    {
      title: "SEVENTH SEMESTER",
      image: "/assets/sem7.jpg",
    },
    {
      title: "EIGHTH SEMESTER",
      image: "/assets/sem28.jpg",
    },
  ];

  useEffect(() => {
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    reveals.forEach((el) => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // trigger once on load

  return () => window.removeEventListener("scroll", revealOnScroll);
}, []);

  return (
    <div className="course-page">
      {/* ================= NAVBAR ================= */}
      <Navbar />

      <section className="team-hero reveal reveal-top">
        <h1>Course Structure | NEP SYLLABUS |</h1>
        <p>Explore semester-wise journey designed for chemical engineering
          enthusiasts.</p>
      </section>

      {/* ================= FEATURED EVENTS ================= */}

      <section id="allcourses">
        <h1>COURSE STRUCTURE</h1>
      </section>

      <section className="course-images">
        {course.map((item, idx) => (
        <div className="course-card" key={idx}>
          <img src={item.image} alt={item.title} />
          <h4>{item.title}</h4>
    </div>
  ))}
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};

export default CourseStructure;