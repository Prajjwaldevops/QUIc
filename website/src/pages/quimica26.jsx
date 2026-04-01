import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import '../styles/homePage.css';
import '../styles/quimica26.css';
import Navbar from "./navbar";
import Footer from "./footer";

const Quimica26 = () => {
  const navigate = useNavigate();
  const { userProfile, signOut } = useAuth();
  const [hasQuantum, setHasQuantum] = useState(false);
  const [quantumActive, setQuantumActive] = useState(false);
  const [loading, setLoading] = useState(true);

  // Scroll reveal effect
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

  // Check registrations for Quantum
  useEffect(() => {
    window.scrollTo(0, 0);
    checkRegistrations();
  }, [userProfile]);

  const checkRegistrations = async () => {
    if (!userProfile) {
      setLoading(false);
      return;
    }

    try {
      // Check Quantum registration
      const { data: quantum } = await supabase
        .from('quantum_registrations')
        .select('uid')
        .eq('user_email', userProfile.email);

      if (quantum && quantum.length > 0) setHasQuantum(true);

      // Fetch Quantum event status
      const { data: settings } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'quantum_active')
        .single();

      if (settings && settings.value === true) {
        setQuantumActive(true);
      }
    } catch (err) {
      console.error('Error checking registrations:', err);
    }

    setLoading(false);
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

  return (
    <div className="q26-page">
      {/* NAVBAR */}
      <Navbar />

      {/* User bar */}
      <div className="q26-user-bar">
        <span className="q26-user-name">
          Welcome, <strong>{userProfile?.name || 'User'}</strong>
        </span>
        <button className="q26-signout-btn" onClick={handleSignOut}>Sign Out</button>
      </div>

      {/* Hero */}
      <section className="q26-hero">
        <h1>QUIMICA'26</h1>
        <p>Register for the event below</p>
      </section>

      {/* Event Cards — Only Quantum */}
      <section className="q26-events q26-events-single">
        {/* Quantum */}
        <div className="q26-card q26-card-featured">
          <div className="q26-card-img">
            <img src="/assets/quantum_poster.jpg" alt="Quantum - Let Your Logic Lead the Way" />
          </div>
          <h3>Quantum</h3>
          <p>"Let Your Logic Lead the Way" — Fight or Flight (Pen & Paper) + Sustain-a-thon. MC-31, Chemical Engineering Dept. 10–11 April 2026.</p>
          <div className="q26-card-actions">
            {quantumActive ? (
              <button className="q26-btn q26-btn-primary" onClick={handleQuantumRegister}>
                {hasQuantum ? 'View Unique ID' : 'Register for Quantum'}
              </button>
            ) : (
              <button className="q26-btn q26-btn-locked" disabled>
                <span className="lock-icon">🔒</span>
                Registrations Locked
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Quimica26;
