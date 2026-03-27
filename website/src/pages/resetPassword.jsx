import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';
import '../styles/homePage.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Please enter a new password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await updatePassword(password);
      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
      setSuccess(true);
      // Redirect to sign in after 3 seconds
      setTimeout(() => navigate('/signin', { replace: true }), 3000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    }

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
          <div className="auth-form-icon">🔐</div>
          <h2>Set New Password</h2>
          <p className="auth-subtitle">Create a new password for your account</p>

          {error && (
            <div className="auth-error">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          {success ? (
            <div style={{ textAlign: 'center' }}>
              <div className="auth-success">
                <i className="fas fa-check-circle"></i>
                Password updated successfully!
              </div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '15px' }}>
                Redirecting to sign in...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label>New Password</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-lock"></i></span>
                  <input
                    type="password"
                    placeholder="Enter new password (min 6 chars)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              <div className="auth-field">
                <label>Confirm New Password</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-lock"></i></span>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}

          <div className="auth-back" style={{ marginTop: '20px' }}>
            <Link to="/signin">← Back to Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
