import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import '../styles/homePage.css';
import '../styles/quimica26.css';
import '../styles/auth.css';

const BRANCHES = [
  'Computer Science',
  'Computer Science (Cyber Security)',
  'Information Technology',
  'Electronics and Communication',
  'Electrical',
  'Mechanical',
  'Metallurgy',
  'Mining',
  'Chemical',
  'Civil',
  'Production',
];

const QuantumRegister = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', roll_number: '',
    registration_number: '', gender: '', branch: '', batch: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userProfile) {
      setForm({
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone,
        roll_number: userProfile.roll_number,
        registration_number: userProfile.registration_number,
        gender: userProfile.gender,
        branch: userProfile.branch,
        batch: userProfile.batch || '',
      });
      checkExisting();
    }
  }, [userProfile]);

  const checkExisting = async () => {
    const { data } = await supabase
      .from('quantum_registrations')
      .select('uid')
      .eq('user_email', userProfile.email);

    if (data && data.length > 0) {
      navigate('/quimica26/quantum/uid', { replace: true });
    }
    setChecking(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.phone || !form.roll_number ||
        !form.registration_number || !form.gender || !form.branch || !form.batch) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);

    try {
      // Generate UID
      const { data: uidData, error: rpcError } = await supabase.rpc('generate_quantum_uid');
      if (rpcError) {
        setError('Failed to generate unique ID. Please try again.');
        setLoading(false);
        return;
      }

      // Insert registration
      const { error: insertError } = await supabase.from('quantum_registrations').insert({
        uid: uidData,
        user_email: form.email.toLowerCase(),
        name: form.name,
        email: form.email.toLowerCase(),
        phone: form.phone,
        roll_number: form.roll_number.toUpperCase(),
        registration_number: form.registration_number.toUpperCase(),
        gender: form.gender,
        branch: form.branch,
        batch: form.batch,
      });

      if (insertError) {
        if (insertError.message.includes('duplicate')) {
          setError('You are already registered for Quantum.');
        } else {
          setError(insertError.message);
        }
        setLoading(false);
        return;
      }

      navigate('/quimica26/quantum/uid', { replace: true });
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    }

    setLoading(false);
  };

  if (checking) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="team-register-page">
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

      <div className="team-form-container">
        <div className="team-form-header">
          <h1>Register for Quantum</h1>
          <p>Solo event registration — your details are pre-filled</p>
        </div>

        {error && (
          <div className="auth-error">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="team-section">
            <div className="team-section-title">
              Your Details
              <span className="badge">Auto-filled</span>
            </div>
            <div className="team-fields-grid">
              <div className="auth-field">
                <label>Name</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-user"></i></span>
                  <input type="text" value={form.name} readOnly style={{ opacity: 0.6 }} />
                </div>
              </div>
              <div className="auth-field">
                <label>Email ID</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-envelope"></i></span>
                  <input type="email" value={form.email} readOnly style={{ opacity: 0.6 }} />
                </div>
              </div>
              <div className="auth-field">
                <label>Phone Number</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-phone"></i></span>
                  <input type="tel" value={form.phone} readOnly style={{ opacity: 0.6 }} />
                </div>
              </div>
              <div className="auth-field">
                <label>Roll Number</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-id-badge"></i></span>
                  <input type="text" value={form.roll_number} readOnly style={{ opacity: 0.6 }} />
                </div>
              </div>
              <div className="auth-field">
                <label>Registration Number</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-hashtag"></i></span>
                  <input type="text" value={form.registration_number} readOnly style={{ opacity: 0.6 }} />
                </div>
              </div>
              <div className="auth-field">
                <label>Branch</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-graduation-cap"></i></span>
                  <select value={form.branch} disabled style={{ opacity: 0.6 }}>
                    <option value="">Select branch</option>
                    {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div className="auth-field team-field-full">
                <label>Gender</label>
                <div className="auth-gender-group">
                  <label className="auth-gender-option">
                    <input type="radio" value="Male" checked={form.gender === 'Male'} disabled />
                    <span>Male</span>
                  </label>
                  <label className="auth-gender-option">
                    <input type="radio" value="Female" checked={form.gender === 'Female'} disabled />
                    <span>Female</span>
                  </label>
                </div>
              </div>
              <div className="auth-field">
                <label>Batch</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-calendar"></i></span>
                  <select value={form.batch} disabled style={{ opacity: 0.6 }}>
                    <option value="">Select batch</option>
                    <option value="2K23">2K23</option>
                    <option value="2K24">2K24</option>
                    <option value="2K25">2K25</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Register for Quantum'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuantumRegister;
