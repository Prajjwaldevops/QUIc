import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSignUp } from '@clerk/clerk-react';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';
import '../styles/homePage.css';
import Navbar from "./navbar";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { insertProfile } = useAuth();

  const email = location.state?.email;
  const formData = location.state?.formData;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Redirect if no email/formData
  useEffect(() => {
    if (!email || !formData) {
      navigate('/register');
    }
  }, [email, formData, navigate]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    if (pasted.length === 6) {
      inputRefs.current[5]?.focus();
    }
  };

  const handleResend = async () => {
    if (!isLoaded || !signUp) return;
    setError('');
    setCanResend(false);
    setTimer(60);

    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
    } catch (err) {
      const msg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || 'Failed to resend code.';
      setError(msg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLoaded || !signUp) {
      setError('Authentication is loading. Please wait...');
      return;
    }

    const token = otp.join('');
    if (token.length !== 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Verify the email OTP with Clerk
      const result = await signUp.attemptEmailAddressVerification({ code: token });

      if (result.status === 'complete') {
        // Step 2: Set the active Clerk session
        await setActive({ session: result.createdSessionId });

        // Step 3: Insert user profile into Supabase
        const { error: profileError } = await insertProfile(formData, result.createdUserId);

        if (profileError) {
          setError(profileError);
          setLoading(false);
          return;
        }

        // Step 4: Navigate to event page
        navigate('/quimica26', { replace: true });
      } else {
        setError('Verification not complete. Please try again.');
      }
    } catch (err) {
      const msg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || 'Invalid OTP. Please try again.';
      setError(msg);
    }

    setLoading(false);
  };

  if (!email || !formData) return null;

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

      {/* RIGHT — OTP FORM */}
      <div className="auth-form-panel">
        <div className="auth-form-card">
          <div className="auth-form-icon">✉️</div>
          <h2>Verify Email</h2>
          <p className="auth-subtitle">Enter the 6-digit OTP sent to your email</p>

          <p className="otp-email-display">
            Sent to <strong>{email}</strong>
          </p>

          {error && (
            <div className="auth-error">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="otp-container" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className={`otp-input ${digit ? 'filled' : ''}`}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <div className="otp-timer">
              {canResend ? (
                <button type="button" className="otp-resend" onClick={handleResend}>
                  Resend OTP
                </button>
              ) : (
                <>
                  Resend OTP in <span>{timer}s</span>
                </>
              )}
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
          </form>

          <div className="auth-secure-badge">
            <i className="fas fa-shield-alt"></i>
            <div>
              <span className="secure-title">Secure Authentication</span>
              <span className="secure-desc">Your data is protected and encrypted</span>
            </div>
          </div>

          <div className="auth-back">
            <Link to="/register">← Back to Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
