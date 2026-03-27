import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';
import '../styles/homePage.css';

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

const BATCHES = ['2K23', '2K24', '2K25'];

const Register = () => {
  const navigate = useNavigate();
  const { userProfile, register } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    branch: '',
    gender: '',
    roll_number: '',
    registration_number: '',
    batch: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already signed in, redirect to event page
  useEffect(() => {
    if (userProfile) {
      navigate('/quimica26', { replace: true });
    }
  }, [userProfile, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Password strength checks
  const passwordChecks = {
    length: form.password.length >= 8,
    uppercase: /[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.password),
  };
  const allPasswordChecks = Object.values(passwordChecks).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    const required = ['name', 'email', 'phone', 'branch', 'gender', 'roll_number', 'registration_number', 'batch', 'password', 'confirmPassword'];
    for (const field of required) {
      if (!form[field]) {
        setError('All fields are required.');
        return;
      }
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Phone format
    if (!/^[0-9]{10}$/.test(form.phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    // Password strength
    if (!allPasswordChecks) {
      setError('Password does not meet all requirements.');
      return;
    }

    // Confirm password
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    const { data, error: regError } = await register(form);

    if (regError) {
      setError(regError);
      setLoading(false);
      return;
    }

    // Registration successful → go to event page
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
          <div className="auth-form-icon">📝</div>
          <h2>Create Account</h2>
          <p className="auth-subtitle">Register to access the event portal</p>

          {error && (
            <div className="auth-error">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="auth-form-scroll">
              {/* Name */}
              <div className="auth-field">
                <label>Name</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-user"></i></span>
                  <input type="text" name="name" placeholder="Enter your full name"
                    value={form.name} onChange={handleChange} />
                </div>
              </div>

              {/* Email */}
              <div className="auth-field">
                <label>Email ID</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-envelope"></i></span>
                  <input type="email" name="email" placeholder="Enter your email"
                    value={form.email} onChange={handleChange} />
                </div>
              </div>

              {/* Phone */}
              <div className="auth-field">
                <label>Phone Number</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-phone"></i></span>
                  <input type="tel" name="phone" placeholder="10-digit phone number"
                    value={form.phone} onChange={handleChange} />
                </div>
              </div>

              {/* Roll Number */}
              <div className="auth-field">
                <label>Roll Number</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-id-badge"></i></span>
                  <input type="text" name="roll_number" placeholder="Enter your roll number"
                    value={form.roll_number} onChange={handleChange} />
                </div>
              </div>

              {/* Registration Number */}
              <div className="auth-field">
                <label>Registration Number</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-hashtag"></i></span>
                  <input type="text" name="registration_number" placeholder="Enter your registration number"
                    value={form.registration_number} onChange={handleChange} />
                </div>
              </div>

              {/* Branch */}
              <div className="auth-field">
                <label>Branch</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-graduation-cap"></i></span>
                  <select name="branch" value={form.branch} onChange={handleChange}>
                    <option value="">Select your branch</option>
                    {BRANCHES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Batch */}
              <div className="auth-field">
                <label>Batch</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-calendar"></i></span>
                  <select name="batch" value={form.batch} onChange={handleChange}>
                    <option value="">Select your batch</option>
                    {BATCHES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Gender */}
              <div className="auth-field">
                <label>Gender</label>
                <div className="auth-gender-group">
                  <label className="auth-gender-option">
                    <input type="radio" name="gender" value="Male"
                      checked={form.gender === 'Male'} onChange={handleChange} />
                    <span>Male</span>
                  </label>
                  <label className="auth-gender-option">
                    <input type="radio" name="gender" value="Female"
                      checked={form.gender === 'Female'} onChange={handleChange} />
                    <span>Female</span>
                  </label>
                </div>
              </div>

              {/* Password */}
              <div className="auth-field">
                <label>Password</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-lock"></i></span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
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

                {/* Password strength indicators */}
                {form.password.length > 0 && (
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

              {/* Confirm Password */}
              <div className="auth-field">
                <label>Confirm Password</label>
                <div className="auth-input-wrapper">
                  <span className="input-icon"><i className="fas fa-lock"></i></span>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowConfirm(!showConfirm)}
                    tabIndex={-1}
                  >
                    {showConfirm ? '🙈' : '👁️'}
                  </button>
                </div>
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <div className="pw-req" style={{ marginTop: '6px' }}>
                    ✗ Passwords do not match
                  </div>
                )}
                {form.confirmPassword && form.password === form.confirmPassword && form.confirmPassword.length > 0 && (
                  <div className="pw-req met" style={{ marginTop: '6px' }}>
                    ✓ Passwords match
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="auth-secure-badge">
            <i className="fas fa-shield-alt"></i>
            <div>
              <span className="secure-title">Secure Authentication</span>
              <span className="secure-desc">Your password is encrypted and stored securely</span>
            </div>
          </div>

          <p className="auth-switch">
            Already registered?{' '}
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

export default Register;
