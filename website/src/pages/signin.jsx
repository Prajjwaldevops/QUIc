import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignIn } from '@clerk/clerk-react';
import { useAuth } from '../context/AuthContext';
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

const SignIn = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mfaRequired, setMfaRequired] = useState(false);
  const [code, setCode] = useState('');

  // If already signed in, redirect to event page
  useEffect(() => {
    if (userProfile) {
      navigate('/quimica26', { replace: true });
    }
  }, [userProfile, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLoaded) {
      setError('Authentication is loading. Please wait...');
      return;
    }

    if (!emailOrPhone) {
      setError('Please enter your email or phone number.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      let identifier = emailOrPhone.trim().toLowerCase();
      const isPhone = /^\d{10}$/.test(identifier);

      // Fetch user from Supabase 
      const { data: userData } = await supabase
        .from('users')
        .select('email, password_hash')
        .eq(isPhone ? 'phone' : 'email', identifier)
        .single();

      if (!userData) {
        setError('No account found with these details. Please register first.');
        setLoading(false);
        return;
      }
      
      identifier = userData.email;

      // 1) First Auth Layer: Supabase stored password hash check
      if (userData.password_hash) {
        const inputHash = await hashPassword(password);
        if (inputHash !== userData.password_hash) {
          setError('Incorrect password.');
          setLoading(false);
          return;
        }
      }

      // Sign in with Clerk
      const result = await signIn.create({
        identifier: identifier,
        password: password,
      });

      if (result.status === 'complete') {
        // Set the active Clerk session
        await setActive({ session: result.createdSessionId });
        // Let the useEffect hook handle navigation once AuthContext synchronizes!
      } else if (result.status === 'needs_first_factor') {
        const factor = result.supportedFirstFactors.find(f => f.strategy === 'email_code');
        if (factor) {
          await signIn.prepareFirstFactor({ strategy: 'email_code', emailAddressId: factor.emailAddressId });
          setMfaRequired(true);
          setError('Clerk requires email verification. A code has been sent to your email.');
        } else {
          setError(`Additional verification required. Clerk requires: ${JSON.stringify(result.supportedFirstFactors)}`);
        }
      } else if (result.status === 'needs_second_factor') {
        const factor = result.supportedSecondFactors.find(f => f.strategy === 'email_code');
        if (factor) {
          await signIn.prepareSecondFactor({ strategy: 'email_code', emailAddressId: factor.emailAddressId });
        }
        setMfaRequired(true);
        setError('MFA requested by Clerk. A code has been sent to your email.');
      } else {
        setError('Sign in failed. Please try again.');
      }
    } catch (err) {
      const clerkError = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || err?.message || 'Sign in failed. Please try again.';

      // Map Clerk errors to user-friendly messages
      if (clerkError?.includes('identifier') || clerkError?.includes('not found')) {
        setError('No account found with this email. Please register first.');
      } else if (clerkError?.includes('password')) {
        setError('Incorrect password. Please try again.');
      } else {
        setError(clerkError);
      }
    }

    setLoading(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!code) {
      setError('Please enter the verification code.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      let result;
      // Attempt verification based on Clerk's current internal status
      if (signIn.status === 'needs_second_factor') {
        result = await signIn.attemptSecondFactor({ strategy: 'email_code', code });
      } else {
        result = await signIn.attemptFirstFactor({ strategy: 'email_code', code });
      }

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
      } else {
        setError('Verification failed. Internal Status: ' + result.status);
      }
    } catch (err) {
      const clerkError = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || err?.message || 'Verification failed. Please try again.';
      setError(clerkError);
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
          <div className="auth-form-icon">🔑</div>
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to access the event portal</p>

          {error && (
            <div className="auth-error">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          {mfaRequired ? (
            <form onSubmit={handleVerify}>
              <div className="auth-field">
                <label>Verification Code</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-key"></i></span>
                  <input
                    type="text"
                    placeholder="Enter the code sent to your email"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
              <button 
                type="button" 
                className="q26-btn q26-btn-secondary" 
                style={{ width: '100%', marginTop: '10px' }}
                onClick={() => setMfaRequired(false)}
              >
                Go Back
              </button>
            </form>
          ) : (
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
          )}

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
