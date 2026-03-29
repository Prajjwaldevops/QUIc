import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/newsletter.css";
import "../styles/homePage.css";
import Navbar from "./navbar";
import Footer from "./footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faLinkedinIn, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";

  const Newsletter = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const magazine = [
    {
      title: "INNOVERSE",
      date: "March 11, 2026",
      description: "Solve real-world chemical engineering problems in teams.",
      image: "/assets/Innoverse.jpg",
    },
    {
      title: "SMARTSCAPE",
      date: "March 12, 2026",
      description: "Algorithmic problem-solving competition for enthusiasts.",
      image: "/assets/Smart_scape.jpg",
    },
    {
      title: "BITS BLOG",
      date: "March 12, 2026",
      description: "Algorithmic problem-solving competition for enthusiasts.",
      image: "/assets/Bits_blog.jpg",
    },
  ];
useEffect(() => {
    window.scrollTo(0, 0);
    checkRegistrations();
  }, []);

  const checkRegistrations = async () => {
    if (!userProfile) return;

    // Check Quimi Dexter team
    const { data: teams } = await supabase
      .from('quimi_dexter_teams')
      .select('team_id')
      .or(`leader_email.eq.${userProfile.email},member1_email.eq.${userProfile.email},member2_email.eq.${userProfile.email},member3_email.eq.${userProfile.email}`);

    if (teams && teams.length > 0) setHasTeam(true);

    // Check Quantum registration
    const { data: quantum } = await supabase
      .from('quantum_registrations')
      .select('uid')
      .eq('user_email', userProfile.email);

    if (quantum && quantum.length > 0) setHasQuantum(true);

    setLoading(false);
  };

  const handleQuimiDexterRegister = () => {
    if (hasTeam) {
      navigate('/quimica26/quimi-dexter/team-id');
    } else {
      navigate('/quimica26/quimi-dexter/register');
    }
  };

  const handleQuantumRegister = () => {
    if (hasQuantum) {
      navigate('/quimica26/quantum/uid');
    } else {
      navigate('/quimica26/quantum/register');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
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
    <div className="magazine-page">
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO ================= */}
      {/* <section className="hero">
        <div className="magazine-header">
          <h1>Our Exciting magazine</h1>
        </div>
        <p>
          Join us for a series of competitions, workshops, and quizzes designed
          for chemical engineering enthusiasts!
        </p>
      </section> */}
           <section className="team-hero reveal reveal-top">
        <h1>Our Exciting magazine</h1>
        <p>            Join us for a series of competitions, workshops, and quizzes designed
          for chemical engineering enthusiasts!</p>
      </section>

      {/* ================= FEATURED Magazine ================= */}
      <section className="featured-event">
        <div className="featured-image">
          <img src="/assets/Quimica25.jpg" alt="QUIMICA'25" />
        </div>
        <div className="featured-info">
          <h2>NEWSLETTER 2025</h2>
          <p>
            Test your chemical engineering knowledge in a timed quiz designed
            to push our concepts and analytical thinking.
          </p>
          <button onClick={() => {const link = document.createElement("a");
            link.href = "/files/brochure26.pdf";
            link.download = "QUIMICA_Brochure.pdf";
            link.click();}}>Download</button>
        </div>
      </section>

      <section className="featured-event">
        <div className="featured-image">
          <img src="/assets/Quimica23.jpg" alt="QUIMICA'23" />
        </div>
        <div className="featured-info">
          <h2>NEWSLETTER 2024</h2>
          <p>
            Test your chemical engineering knowledge in a timed quiz designed
            to push our concepts and analytical thinking.
          </p>
          <button onClick={() => {const link = document.createElement("a");
            link.href = "/files/brochure25.pdf";
            link.download = "QUIMICA_Brochure.pdf";
            link.click();}}>Download</button>
        </div>
      </section>

            <section className="featured-event">
        <div className="featured-image">
          <img src="/assets/Quimica23.jpg" alt="QUIMICA'23" />
        </div>
        <div className="featured-info">
          <h2>NEWSLETTER 2023</h2>
          <p>
            Test your chemical engineering knowledge in a timed quiz designed
            to push our concepts and analytical thinking.
          </p>
          <button onClick={() => {const link = document.createElement("a");
            link.href = "/files/brochure24.pdf";
            link.download = "QUIMICA_Brochure.pdf";
            link.click();}}>Download</button>
        </div>
      </section>


      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};

export default Newsletter;