import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';
import '../styles/homePage.css';

const SignIn = () => {
  const navigate = useNavigate();
  const { userProfile, signIn } = useAuth();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already signed in, redirect to event page
  useEffect(() => {
    if (userProfile) {
      navigate('/quimica26', { replace: true });
    }
  }, [userProfile, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!emailOrPhone) {
      setError('Please enter your email or phone number.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    const { data, error: signInError } = await signIn(emailOrPhone, password);

    if (signInError) {
      setError(signInError);
      setLoading(false);
      return;
    }

    // Success → navigate to events
    navigate('/quimica26', { replace: true });
    setLoading(false);
  };

  return (
    <div className="auth-page">
      {/* LEFT — BRANDING */}
      <div className="auth-branding">
        <img src="/quimicaLogoWhite.png" alt="Quimica" className="auth-logo" />
        <h1>QUIMICA</h1>
        <p className="auth-tagline">Chemical Engineering Society</p>
        <p className="auth-date">BIT Sindri, 2026</p>

        <div className="auth-features">
          <div className="auth-feature-item">
            <div className="auth-feature-icon">⚡</div>
            <span>Fast Access</span>
          </div>
          <div className="auth-feature-item">
            <div className="auth-feature-icon">🔒</div>
            <span>Secure</span>
          </div>
          <div className="auth-feature-item">
            <div className="auth-feature-icon">🎯</div>
            <span>Exclusive</span>
          </div>
        </div>
      </div>

      {/* RIGHT — FORM */}
      <div className="auth-form-panel">
        <div className="auth-form-card">
          <div className="auth-form-icon">🔑</div>
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to access the event portal</p>

          {error && (
            <div className="auth-error">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email or Phone */}
            <div className="auth-field">
              <label>Email ID or Phone Number</label>
              <div className="auth-input-wrapper">
                <span className="input-icon"><i className="fas fa-user"></i></span>
                <input
                  type="text"
                  placeholder="Enter email or 10-digit phone number"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-field">
              <label>Password</label>
              <div className="auth-input-wrapper">
                <span className="input-icon"><i className="fas fa-lock"></i></span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              <div style={{ textAlign: 'right', marginTop: '8px' }}>
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-secure-badge">
            <i className="fas fa-shield-alt"></i>
            <div>
              <span className="secure-title">Secure Authentication</span>
              <span className="secure-desc">Your data is protected and encrypted</span>
            </div>
          </div>

          <p className="auth-switch">
            Don't have an account?{' '}
            <Link to="/register">Register</Link>
          </p>

          <div className="auth-back">
            <Link to="/">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
