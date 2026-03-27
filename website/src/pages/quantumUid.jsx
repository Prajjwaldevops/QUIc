import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import '../styles/homePage.css';
import '../styles/quimica26.css';

const QuantumUid = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRegistration();
  }, []);

  const fetchRegistration = async () => {
    if (!userProfile) return;

    const { data } = await supabase
      .from('quantum_registrations')
      .select('*')
      .eq('user_email', userProfile.email)
      .single();

    if (data) {
      setRegistration(data);
    } else {
      navigate('/quimica26/quantum/register', { replace: true });
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!registration) return null;

  return (
    <div className="uid-page">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <img src="/quimicaLogoWhite.png" alt="logo" />
          <h2>QUIMICA</h2>
        </div>
        <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>☰</div>
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/quimica26" onClick={() => setMenuOpen(false)}>Quimica'26</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
        </ul>
      </nav>

      <div className="uid-content">
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '10px' }}>
          Your Quantum Unique ID
        </p>
        <div className="uid-badge">{registration.uid}</div>

        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', marginBottom: '30px' }}>
          {registration.name}
        </p>

        <div className="uid-info">
          <div className="uid-info-item">
            <strong>Email: </strong>{registration.email}
          </div>
          <div className="uid-info-item">
            <strong>Branch: </strong>{registration.branch}
          </div>
          <div className="uid-info-item">
            <strong>Roll: </strong>{registration.roll_number}
          </div>
          <div className="uid-info-item">
            <strong>Gender: </strong>{registration.gender}
          </div>
        </div>

        <button
          className="q26-btn q26-btn-secondary"
          style={{ maxWidth: '300px', width: '100%' }}
          onClick={() => navigate('/quimica26')}
        >
          ← Back to Events
        </button>
      </div>
    </div>
  );
};

export default QuantumUid;
