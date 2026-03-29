import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import '../styles/homePage.css';
import '../styles/quimica26.css';
import Navbar from "./navbar";
import Footer from "./footer";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Quimica26 = () => {
  const navigate = useNavigate();
  const { userProfile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);
  const [hasQuantum, setHasQuantum] = useState(false);
  const [loading, setLoading] = useState(true);

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
        <p>Choose your event and register to participate</p>
      </section>

      {/* Event Cards */}
      <section className="q26-events">
        {/* Quimi Dexter */}
        <div className="q26-card">
          <div className="q26-card-img">
            <img src="/assets/Quimica25.jpg" alt="Quimi Dexter" />
          </div>
          <h3>Quimi Dexter</h3>
          <p>Team-based event. Form a team of 4 and showcase your chemical engineering prowess.</p>
          <div className="q26-card-actions">
            <button className="q26-btn q26-btn-primary" onClick={handleQuimiDexterRegister}>
              {hasTeam ? 'View Team ID' : 'Register for Quimi Dexter'}
            </button>
            {hasTeam ? (
              <button
                className="q26-btn q26-btn-secondary"
                onClick={() => navigate('/quimica26/quimi-dexter/submission')}
              >
                Submit Draft for Quimi Dexter
              </button>
            ) : (
              <button className="q26-btn q26-btn-locked" disabled>
                <span className="lock-icon">🔒</span>
                Submit Draft for Quimi Dexter
              </button>
            )}
          </div>
        </div>

        {/* Quantum */}
        <div className="q26-card">
          <div className="q26-card-img">
            <img src="/assets/Quimica23.jpg" alt="Quantum" />
          </div>
          <h3>Quantum</h3>
          <p>Solo event. Test your individual knowledge and skills in chemical engineering.</p>
          <div className="q26-card-actions">
            <button className="q26-btn q26-btn-primary" onClick={handleQuantumRegister}>
              {hasQuantum ? 'View Unique ID' : 'Register for Quantum'}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Quimica26;
