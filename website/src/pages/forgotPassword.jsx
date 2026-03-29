import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';
import '../styles/homePage.css';
import Navbar from "./navbar";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { hashPassword } = useAuth();
  const [step, setStep] = useState('email'); // 'email' | 'reset'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password strength checks
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };
  const allPasswordChecks = Object.values(passwordChecks).every(Boolean);

  const handleVerifyIdentity = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    if (!phone) {
      setError('Please enter your phone number.');
      return;
    }

    setLoading(true);

    // Verify email + phone combination exists
    const { data: user } = await supabase
      .from('users')
      .select('email, phone')
      .eq('email', email.trim().toLowerCase())
      .eq('phone', phone.trim())
      .single();

    if (!user) {
      setError('No account found with this email and phone number combination.');
      setLoading(false);
      return;
    }

    setStep('reset');
    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (!allPasswordChecks) {
      setError('Password does not meet all requirements.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    const passwordHash = await hashPassword(password);

    const { error: updateError } = await supabase
      .from('users')
      .update({ password_hash: passwordHash })
      .eq('email', email.trim().toLowerCase());

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    // Redirect to sign in after 3 seconds
    setTimeout(() => navigate('/signin', { replace: true }), 3000);
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
          <div className="auth-form-icon">🔓</div>
          <h2>Reset Password</h2>

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
          ) : step === 'email' ? (
            <>
              <p className="auth-subtitle">Verify your identity to reset your password</p>

              {error && (
                <div className="auth-error">
                  <i className="fas fa-exclamation-circle"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleVerifyIdentity}>
                <div className="auth-field">
                  <label>Email ID</label>
                  <div className="auth-input-wrapper">
                    <span className="input-icon"><i className="fas fa-envelope"></i></span>
                    <input
                      type="email"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label>Phone Number</label>
                  <div className="auth-input-wrapper">
                    <span className="input-icon"><i className="fas fa-phone"></i></span>
                    <input
                      type="tel"
                      placeholder="Enter your registered phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="auth-subtitle">Create a new password for your account</p>

              {error && (
                <div className="auth-error">
                  <i className="fas fa-exclamation-circle"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleResetPassword}>
                <div className="auth-field">
                  <label>New Password</label>
                  <div className="auth-input-wrapper">
                    <span className="input-icon"><i className="fas fa-lock"></i></span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoFocus
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

                  {password.length > 0 && (
                    <div className="password-requirements">
                      <div className={`pw-req ${passwordChecks.length ? 'met' : ''}`}>
                        {passwordChecks.length ? '✓' : '✗'} Minimum 8 characters
                      </div>
                      <div className={`pw-req ${passwordChecks.uppercase ? 'met' : ''}`}>
                        {passwordChecks.uppercase ? '✓' : '✗'} At least 1 uppercase letter
                      </div>
                      <div className={`pw-req ${passwordChecks.number ? 'met' : ''}`}>
                        {passwordChecks.number ? '✓' : '✗'} At least 1 number
                      </div>
                      <div className={`pw-req ${passwordChecks.special ? 'met' : ''}`}>
                        {passwordChecks.special ? '✓' : '✗'} At least 1 special character
                      </div>
                    </div>
                  )}
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
            </>
          )}

          <p className="auth-switch" style={{ marginTop: '20px' }}>
            Remember your password?{' '}
            <Link to="/signin">Sign In</Link>
          </p>

          <div className="auth-back">
            <Link to="/">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
