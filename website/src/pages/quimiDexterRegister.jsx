import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import '../styles/homePage.css';
import '../styles/quimica26.css';
import '../styles/auth.css';
import Navbar from "./navbar";

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

const emptyMember = {
  name: '', email: '', phone: '', roll_number: '',
  registration_number: '', gender: '', branch: '', batch: '',
};

const QuimiDexterRegister = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [leader, setLeader] = useState({ ...emptyMember });
  const [members, setMembers] = useState([
    { ...emptyMember },
    { ...emptyMember },
    { ...emptyMember },
  ]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingTeam, setCheckingTeam] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userProfile) {
      // Auto-fill leader from logged-in user
      setLeader({
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone,
        roll_number: userProfile.roll_number,
        registration_number: userProfile.registration_number,
        gender: userProfile.gender,
        branch: userProfile.branch,
        batch: userProfile.batch || '',
      });
      checkExistingTeam();
    }
  }, [userProfile]);

  const checkExistingTeam = async () => {
    const { data: teams } = await supabase
      .from('quimi_dexter_teams')
      .select('team_id')
      .or(`leader_email.eq.${userProfile.email},member1_email.eq.${userProfile.email},member2_email.eq.${userProfile.email},member3_email.eq.${userProfile.email}`);

    if (teams && teams.length > 0) {
      navigate('/quimica26/quimi-dexter/team-id', { replace: true });
    }
    setCheckingTeam(false);
  };

  const updateMember = (index, field, value) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate team name
    if (!teamName.trim()) {
      setError('Team name is required.');
      return;
    }

    // Validate all member fields
    const allMembers = [leader, ...members];
    for (let i = 0; i < allMembers.length; i++) {
      const m = allMembers[i];
      const label = i === 0 ? 'Team Leader' : `Team Member ${i}`;
      if (!m.name || !m.email || !m.phone || !m.roll_number || !m.registration_number || !m.gender || !m.branch || !m.batch) {
        setError(`All fields are required for ${label}.`);
        return;
      }
      if (!/^\d+$/.test(m.roll_number)) {
        setError(`Roll number for ${label} must strictly contain only numbers.`);
        return;
      }
      if (!/^\d+$/.test(m.registration_number)) {
        setError(`Registration number for ${label} must strictly contain only numbers.`);
        return;
      }
    }

    // Check for duplicate members (by email, phone, roll, reg)
    const emails = allMembers.map((m) => m.email.toLowerCase());
    const phones = allMembers.map((m) => m.phone);
    const rolls = allMembers.map((m) => m.roll_number.toUpperCase());
    const regs = allMembers.map((m) => m.registration_number.toUpperCase());

    if (new Set(emails).size !== 4) { setError('Duplicate email addresses found in team members.'); return; }
    if (new Set(phones).size !== 4) { setError('Duplicate phone numbers found in team members.'); return; }
    if (new Set(rolls).size !== 4) { setError('Duplicate roll numbers found in team members.'); return; }
    if (new Set(regs).size !== 4) { setError('Duplicate registration numbers found in team members.'); return; }

    setLoading(true);

    try {
      // 1. Check all 4 members are registered on the website
      for (let i = 0; i < allMembers.length; i++) {
        const m = allMembers[i];
        const label = i === 0 ? 'Team Leader' : `Team Member ${i}`;

        const { data: user } = await supabase
          .from('users')
          .select('email, phone, roll_number, registration_number, gender, branch, batch')
          .eq('email', m.email.toLowerCase())
          .single();

        if (!user) {
          setError(`${label} (${m.email}) is not registered on the website. All team members must register first.`);
          setLoading(false);
          return;
        }

        // Verify details match
        if (user.phone !== m.phone) {
          setError(`${label}'s phone number does not match their website registration profile.`);
          setLoading(false);
          return;
        }
        if (user.roll_number !== m.roll_number) {
          setError(`${label}'s roll number does not match their website registration profile.`);
          setLoading(false);
          return;
        }
        if (user.registration_number !== m.registration_number) {
          setError(`${label}'s registration number does not match their website registration profile.`);
          setLoading(false);
          return;
        }
        if (user.gender !== m.gender) {
          setError(`${label}'s gender does not match their website registration profile.`);
          setLoading(false);
          return;
        }
        if (user.branch !== m.branch) {
          setError(`${label}'s branch does not match their website registration profile.`);
          setLoading(false);
          return;
        }
        if (user.batch !== m.batch) {
          setError(`${label}'s batch does not match their website registration profile.`);
          setLoading(false);
          return;
        }
      }

      // 2. Check no member is already part of another team
      for (let i = 0; i < allMembers.length; i++) {
        const m = allMembers[i];
        const label = i === 0 ? 'Team Leader' : `Team Member ${i}`;
        const email = m.email.toLowerCase();

        const { data: existingTeams } = await supabase
          .from('quimi_dexter_teams')
          .select('team_id')
          .or(`leader_email.eq.${email},member1_email.eq.${email},member2_email.eq.${email},member3_email.eq.${email}`);

        if (existingTeams && existingTeams.length > 0) {
          setError(`${label} (${m.email}) is already part of team ${existingTeams[0].team_id}.`);
          setLoading(false);
          return;
        }
      }

      // 3. Check at least 1 female (no maximum limit)
      const females = allMembers.filter((m) => m.gender === 'Female');
      if (females.length < 1) {
        setError('At least one female member is required in the team.');
        setLoading(false);
        return;
      }

      // 4. Check maximum 2 from Chemical branch
      const chemicalCount = allMembers.filter((m) => m.branch === 'Chemical').length;
      if (chemicalCount > 2) {
        setError('Maximum 2 members can be from the Chemical branch.');
        setLoading(false);
        return;
      }

      // 5. Generate team ID
      const { data: teamIdData, error: rpcError } = await supabase.rpc('generate_team_id');
      if (rpcError) {
        setError('Failed to generate team ID. Please try again.');
        console.error(rpcError);
        setLoading(false);
        return;
      }

      const teamId = teamIdData;

      // 6. Insert team
      const { error: insertError } = await supabase.from('quimi_dexter_teams').insert({
        team_id: teamId,
        team_name: teamName.trim(),
        leader_email: leader.email.toLowerCase(),
        member1_email: members[0].email.toLowerCase(),
        member2_email: members[1].email.toLowerCase(),
        member3_email: members[2].email.toLowerCase(),
        leader_name: leader.name,
        leader_phone: leader.phone,
        leader_roll: leader.roll_number.toUpperCase(),
        leader_reg: leader.registration_number.toUpperCase(),
        leader_gender: leader.gender,
        leader_branch: leader.branch,
        leader_batch: leader.batch,
        member1_name: members[0].name,
        member1_phone: members[0].phone,
        member1_roll: members[0].roll_number.toUpperCase(),
        member1_reg: members[0].registration_number.toUpperCase(),
        member1_gender: members[0].gender,
        member1_branch: members[0].branch,
        member1_batch: members[0].batch,
        member2_name: members[1].name,
        member2_phone: members[1].phone,
        member2_roll: members[1].roll_number.toUpperCase(),
        member2_reg: members[1].registration_number.toUpperCase(),
        member2_gender: members[1].gender,
        member2_branch: members[1].branch,
        member2_batch: members[1].batch,
        member3_name: members[2].name,
        member3_phone: members[2].phone,
        member3_roll: members[2].roll_number.toUpperCase(),
        member3_reg: members[2].registration_number.toUpperCase(),
        member3_gender: members[2].gender,
        member3_branch: members[2].branch,
        member3_batch: members[2].batch,
      });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      // Navigate to team ID page
      navigate('/quimica26/quimi-dexter/team-id', { replace: true });
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    }

    setLoading(false);
  };

  if (checkingTeam) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const renderMemberFields = (member, onChange, readOnly = false, label = '') => (
    <div className="team-section">
      <div className="team-section-title">
        {label}
        {readOnly && <span className="badge">Auto-filled</span>}
      </div>
      <div className="team-fields-grid">
        <div className="auth-field">
          <label>Name</label>
          <div className="auth-input-wrapper">
            <span className="input-icon"><i className="fas fa-user"></i></span>
            <input type="text" value={member.name} readOnly={readOnly}
              onChange={(e) => onChange('name', e.target.value)} placeholder="Full name"
              style={readOnly ? { opacity: 0.6 } : {}} />
          </div>
        </div>
        <div className="auth-field">
          <label>Email ID</label>
          <div className="auth-input-wrapper">
            <span className="input-icon"><i className="fas fa-envelope"></i></span>
            <input type="email" value={member.email} readOnly={readOnly}
              onChange={(e) => onChange('email', e.target.value)} placeholder="Email"
              style={readOnly ? { opacity: 0.6 } : {}} />
          </div>
        </div>
        <div className="auth-field">
          <label>Phone Number</label>
          <div className="auth-input-wrapper">
            <span className="input-icon"><i className="fas fa-phone"></i></span>
            <input type="tel" value={member.phone} readOnly={readOnly}
              onChange={(e) => onChange('phone', e.target.value)} placeholder="Phone"
              style={readOnly ? { opacity: 0.6 } : {}} />
          </div>
        </div>
        <div className="auth-field">
          <label>Roll Number</label>
          <div className="auth-input-wrapper">
            <span className="input-icon"><i className="fas fa-id-badge"></i></span>
            <input type="text" value={member.roll_number} readOnly={readOnly}
              onChange={(e) => onChange('roll_number', e.target.value)} placeholder="Roll Number"
              style={readOnly ? { opacity: 0.6 } : {}} />
          </div>
        </div>
        <div className="auth-field">
          <label>Registration Number</label>
          <div className="auth-input-wrapper">
            <span className="input-icon"><i className="fas fa-hashtag"></i></span>
            <input type="text" value={member.registration_number} readOnly={readOnly}
              onChange={(e) => onChange('registration_number', e.target.value)} placeholder="Registration Number"
              style={readOnly ? { opacity: 0.6 } : {}} />
          </div>
        </div>
        <div className="auth-field">
          <label>Branch</label>
          <div className="auth-input-wrapper">
            <span className="input-icon"><i className="fas fa-graduation-cap"></i></span>
            <select value={member.branch} disabled={readOnly}
              onChange={(e) => onChange('branch', e.target.value)}
              style={readOnly ? { opacity: 0.6 } : {}}>
              <option value="">Select branch</option>
              {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
        <div className="auth-field">
          <label>Batch</label>
          <div className="auth-input-wrapper">
            <span className="input-icon"><i className="fas fa-calendar"></i></span>
            <select value={member.batch} disabled={readOnly}
              onChange={(e) => onChange('batch', e.target.value)}
              style={readOnly ? { opacity: 0.6 } : {}}>
              <option value="">Select batch</option>
              {BATCHES.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
        <div className="auth-field team-field-full">
          <label>Gender</label>
          <div className="auth-gender-group">
            <label className="auth-gender-option">
              <input type="radio" name={`gender-${label}`} value="Male"
                checked={member.gender === 'Male'} disabled={readOnly}
                onChange={(e) => onChange('gender', e.target.value)} />
              <span>Male</span>
            </label>
            <label className="auth-gender-option">
              <input type="radio" name={`gender-${label}`} value="Female"
                checked={member.gender === 'Female'} disabled={readOnly}
                onChange={(e) => onChange('gender', e.target.value)} />
              <span>Female</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

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
          <h1>Create Team — Quimi Dexter</h1>
          <p>Form your team of 4 members to participate</p>
          
          <div className="auth-error" style={{ backgroundColor: 'rgba(255, 165, 0, 0.1)', color: '#ff9800', border: '1px solid #ff9800', marginTop: '1rem', textAlign: 'left', fontSize: '0.9rem' }}>
            <i className="fas fa-info-circle"></i>
            <strong>Note:</strong> Team leader should fill this form only and all members should register on the website before registering for the event.
          </div>
        </div>

        {error && (
          <div className="auth-error">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Team Name */}
          <div className="team-section team-name-section">
            <div className="team-section-title">Team Name</div>
            <div className="auth-field">
              <div className="auth-input-wrapper">
                <span className="input-icon"><i className="fas fa-users"></i></span>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter your team name"
                />
              </div>
            </div>
          </div>

          {/* Leader */}
          {renderMemberFields(leader, () => {}, true, 'Team Leader (You)')}

          {/* Members */}
          {members.map((member, index) => (
            <React.Fragment key={index}>
              {renderMemberFields(
                member,
                (field, value) => updateMember(index, field, value),
                false,
                `Team Member ${index + 1}`
              )}
            </React.Fragment>
          ))}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Registering Team...' : 'Register Team'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuimiDexterRegister;
