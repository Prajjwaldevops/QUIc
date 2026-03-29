import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/quimica26.css';
import '../styles/auth.css';
import Navbar from "./navbar";

// Hardcoded admin credentials
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'root@2309';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Create a simple JWT-like token (base64 encoded payload with expiry)
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({
        sub: 'admin',
        role: 'admin',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 7 days
      }));
      const signature = btoa('admin-signature-' + Date.now());
      const token = `${header}.${payload}.${signature}`;

      localStorage.setItem('admin_token', token);
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Invalid username or password.');
    }

    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="auth-form-icon">🔐</div>
        <h2>Admin Panel</h2>
        <p className="auth-subtitle" style={{ textAlign: 'center', marginBottom: '25px' }}>
          Enter admin credentials to continue
        </p>

        {error && (
          <div className="auth-error">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Username</label>
            <div className="auth-input-wrapper">
              <span className="input-icon"><i className="fas fa-user"></i></span>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          <div className="auth-field">
            <label>Password</label>
            <div className="auth-input-wrapper">
              <span className="input-icon"><i className="fas fa-lock"></i></span>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-back" style={{ marginTop: '20px' }}>
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
