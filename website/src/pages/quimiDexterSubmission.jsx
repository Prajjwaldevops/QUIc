import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import '../styles/homePage.css';
import '../styles/quimica26.css';
import Navbar from "./navbar";

const QuimiDexterSubmission = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

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
      if (teams[0].draft_url) setSubmitted(true);
    } else {
      navigate('/quimica26', { replace: true });
    }
    setLoading(false);
  };

  const handleFileSelect = (selectedFile) => {
    setError('');
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      return;
    }

    // 5 MB limit (Vercel serverless function body limit)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5 MB limit. Please choose a smaller file.');
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const handleUpload = async () => {
    if (!file || !team) return;
    setError('');
    setUploading(true);
    setProgress(10);

    try {
      // Animate progress
      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 5, 80));
      }, 400);

      // 1. Upload file through server proxy (avoids R2 CORS issues)
      let uploadRes;
      try {
        uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/pdf',
            'x-team-id': team.team_id,
            'x-filename': file.name,
          },
          body: file,
        });
      } catch (networkErr) {
        clearInterval(progressInterval);
        throw new Error('Network error: Could not reach the server. Please check your internet connection and try again.');
      }

      clearInterval(progressInterval);

      if (!uploadRes.ok) {
        const errData = await uploadRes.json().catch(() => ({}));
        throw new Error(errData.error || `Upload failed (${uploadRes.status})`);
      }

      const { url: publicUrl } = await uploadRes.json();
      setProgress(90);

      // 2. Update team record with draft URL
      const { error: updateError } = await supabase
        .from('quimi_dexter_teams')
        .update({
          draft_url: publicUrl,
          draft_submitted_at: new Date().toISOString(),
        })
        .eq('team_id', team.team_id);

      if (updateError) throw updateError;

      setProgress(100);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.');
      console.error(err);
    }

    setUploading(false);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="submission-page">
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

      <div className="submission-container">
        <div className="submission-header">
          <h1>Submit Draft — Quimi Dexter</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
            Upload your team's draft (PDF, max 5 MB)
          </p>
        </div>

        {/* Team Info */}
        {team && (
          <div className="submission-info">
            <div className="submission-info-box">
              <label>Team Name</label>
              <p>{team.team_name}</p>
            </div>
            <div className="submission-info-box">
              <label>Team ID</label>
              <p>{team.team_id}</p>
            </div>
          </div>
        )}

        {submitted ? (
          <div className="upload-success">
            <span className="checkmark">✅</span>
            <h3>Draft Submitted Successfully!</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '10px' }}>
              Your draft has been uploaded and linked to your team.
            </p>
            <button
              className="q26-btn q26-btn-secondary"
              style={{ maxWidth: '300px', margin: '25px auto 0' }}
              onClick={() => navigate('/quimica26')}
            >
              ← Back to Events
            </button>
          </div>
        ) : (
          <>
            {error && (
              <div className="auth-error" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <i className="fas fa-exclamation-circle"></i>
                  {error}
                </div>
                <div style={{ textAlign: 'center', marginTop: '5px', fontSize: '14px' }}>
                  <strong>Upload Failed ?</strong>{' '}
                  <a 
                    href="https://wa.me/916204413032" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: '#ffb347', textDecoration: 'underline' }}
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            )}

            {/* Upload Zone */}
            <div
              className={`upload-zone ${dragging ? 'dragging' : ''}`}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="upload-icon">📄</span>
              <h4>Drag & drop your file here</h4>
              <p>or click to browse • Max size: 5 MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => handleFileSelect(e.target.files[0])}
              />
            </div>

            {/* File info */}
            {file && (
              <div className="upload-file-info">
                <div>
                  <span className="file-name">{file.name}</span>
                  <span className="file-size"> • {formatSize(file.size)}</span>
                </div>
                <button className="remove-file" onClick={() => setFile(null)}>✕</button>
              </div>
            )}

            {/* Progress */}
            {uploading && (
              <div className="upload-progress">
                <div className="upload-progress-bar">
                  <div className="upload-progress-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <p style={{ textAlign: 'center', marginTop: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                  Uploading... {progress}%
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              className="auth-submit-btn"
              disabled={!file || uploading}
              onClick={handleUpload}
              style={{ marginTop: '20px' }}
            >
              {uploading ? 'Uploading...' : 'Submit Draft'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default QuimiDexterSubmission;
