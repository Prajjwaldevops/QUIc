import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import '../styles/homePage.css';
import '../styles/quimica26.css';
import Navbar from "./navbar";

const QuimiDexterTeamId = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    if (!userProfile) return;
    const email = userProfile.email;

    const { data: teams } = await supabase
      .from('quimi_dexter_teams')
      .select('*')
      .or(`leader_email.eq.${email},member1_email.eq.${email},member2_email.eq.${email},member3_email.eq.${email}`);

    if (teams && teams.length > 0) {
      setTeam(teams[0]);
    } else {
      navigate('/quimica26/quimi-dexter/register', { replace: true });
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

  if (!team) return null;

  const memberList = [
    { label: 'Team Leader', name: team.leader_name, email: team.leader_email, branch: team.leader_branch },
    { label: 'Member 1', name: team.member1_name, email: team.member1_email, branch: team.member1_branch },
    { label: 'Member 2', name: team.member2_name, email: team.member2_email, branch: team.member2_branch },
    { label: 'Member 3', name: team.member3_name, email: team.member3_email, branch: team.member3_branch },
  ];

  return (
    <div className="team-id-page">
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

      <div className="team-id-content">
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '10px' }}>
          Your Team ID
        </p>
        <div className="team-id-badge">{team.team_id}</div>
        <div className="team-id-name">{team.team_name}</div>

        <div className="team-id-members">
          {memberList.map((m, i) => (
            <div className="team-id-member" key={i}>
              <strong>{m.name}</strong>
              <span>{m.label} • {m.branch}</span>
              <span style={{ display: 'block', color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>
                {m.email}
              </span>
            </div>
          ))}
        </div>

        <button
          className="q26-btn q26-btn-primary"
          style={{ maxWidth: '350px', width: '100%' }}
          onClick={() => navigate('/quimica26/quimi-dexter/submission')}
        >
          Submit Draft for Quimi Dexter
        </button>

        <button
          className="q26-btn q26-btn-secondary"
          style={{ maxWidth: '350px', width: '100%', marginTop: '12px' }}
          onClick={() => navigate('/quimica26')}
        >
          ← Back to Events
        </button>
      </div>
    </div>
  );
};

export default QuimiDexterTeamId;
