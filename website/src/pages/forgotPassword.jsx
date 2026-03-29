import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignIn } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';
import '../styles/auth.css';
import '../styles/homePage.css';
import Navbar from "./navbar";

// Utility for hashing passwords locally using Web Crypto API
const hashPassword = async (password) => {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { isLoaded, signIn, setActive } = useSignIn();

  // Steps: 'email' → 'code' → 'reset' → 'success'
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Password strength checks
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };
  const allPasswordChecks = Object.values(passwordChecks).every(Boolean);

  // Step 1: Send reset code to email
  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLoaded) {
      setError('Authentication is loading. Please wait...');
      return;
    }

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);

    try {
      // Create a sign-in attempt and request password reset code
      const result = await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email.trim().toLowerCase(),
      });

      if (result.status === 'needs_first_factor') {
        setStep('code');
      } else {
        setError('Unable to send reset code. Please check your email and try again.');
      }
    } catch (err) {
      const msg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || 'Failed to send reset code.';
      if (msg?.includes('identifier') || msg?.includes('not found')) {
        setError('No account found with this email address.');
      } else {
        setError(msg);
      }
    }

    setLoading(false);
  };

  // Step 2: Verify the OTP code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');

    if (!code || code.length < 6) {
      setError('Please enter the complete 6-digit code.');
      return;
    }

    setLoading(true);

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: code,
      });

      if (result.status === 'needs_new_password') {
        setStep('reset');
      } else {
        setError('Invalid code. Please try again.');
      }
    } catch (err) {
      const msg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || 'Invalid code. Please try again.';
      setError(msg);
    }

    setLoading(false);
  };

  // Step 3: Set new password
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

    try {
      const result = await signIn.resetPassword({
        password: password,
      });

      if (result.status === 'complete') {
        // Sync the new password hash to Supabase for dual-verification
        const newPasswordHash = await hashPassword(password);
        await supabase
          .from('users')
          .update({ password_hash: newPasswordHash })
          .eq('email', email.trim().toLowerCase());

        await setActive({ session: result.createdSessionId });
        setStep('success');
        // Redirect to events after 3 seconds
        setTimeout(() => navigate('/quimica26', { replace: true }), 3000);
      } else {
        setError('Password reset failed. Please try again.');
      }
    } catch (err) {
      const msg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || 'Password reset failed.';
      setError(msg);
    }

    setLoading(false);
  };

  // Handle resending the code
  const handleResendCode = async () => {
    setError('');
    setLoading(true);
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email.trim().toLowerCase(),
      });
      setError('');
    } catch (err) {
      const msg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || 'Failed to resend code.';
      setError(msg);
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
          <div className="auth-form-icon">🔓</div>
          <h2>Reset Password</h2>

          {step === 'success' ? (
            <div style={{ textAlign: 'center' }}>
              <div className="auth-success">
                <i className="fas fa-check-circle"></i>
                Password updated successfully!
              </div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '15px' }}>
                Redirecting to events...
              </p>
            </div>
          ) : step === 'email' ? (
            <>
              <p className="auth-subtitle">Enter your email to receive a reset code</p>

              {error && (
                <div className="auth-error">
                  <i className="fas fa-exclamation-circle"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSendCode}>
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

                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Code'}
                </button>
              </form>
            </>
          ) : step === 'code' ? (
            <>
              <p className="auth-subtitle">Enter the 6-digit code sent to <strong style={{ color: '#ff7a00' }}>{email}</strong></p>

              {error && (
                <div className="auth-error">
                  <i className="fas fa-exclamation-circle"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleVerifyCode}>
                <div className="auth-field">
                  <label>Verification Code</label>
                  <div className="auth-input-wrapper">
                    <span className="input-icon"><i className="fas fa-key"></i></span>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter 6-digit code"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      autoFocus
                      maxLength={6}
                    />
                  </div>
                </div>

                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify Code'}
                </button>
              </form>

              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <button
                  type="button"
                  className="otp-resend"
                  onClick={handleResendCode}
                  disabled={loading}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Didn't receive the code? Resend
                </button>
              </div>
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
                  {confirmPassword && password !== confirmPassword && (
                    <div className="pw-req" style={{ marginTop: '6px' }}>
                      ✗ Passwords do not match
                    </div>
                  )}
                  {confirmPassword && password === confirmPassword && confirmPassword.length > 0 && (
                    <div className="pw-req met" style={{ marginTop: '6px' }}>
                      ✓ Passwords match
                    </div>
                  )}
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
