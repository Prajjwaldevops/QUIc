import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import '../styles/quimica26.css';
import '../styles/auth.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTeams: 0,
    totalQuantum: 0,
    totalDrafts: 0,
  });
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [quantum, setQuantum] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      // Fetch users
      const { data: usersData, error: usersError } = await supabase.from('users').select('*').order('created_at', { ascending: false });
      if (usersError) console.error('Users fetch error:', usersError);
      setUsers(usersData || []);

      // Fetch teams
      const { data: teamsData, error: teamsError } = await supabase.from('quimi_dexter_teams').select('*').order('created_at', { ascending: false });
      if (teamsError) console.error('Teams fetch error:', teamsError);
      setTeams(teamsData || []);

      // Fetch quantum
      const { data: quantumData, error: quantumError } = await supabase.from('quantum_registrations').select('*').order('created_at', { ascending: false });
      if (quantumError) console.error('Quantum fetch error:', quantumError);
      setQuantum(quantumData || []);

      setStats({
        totalUsers: usersData?.length || 0,
        totalTeams: teamsData?.length || 0,
        totalQuantum: quantumData?.length || 0,
        totalDrafts: teamsData?.filter((t) => t.draft_url).length || 0,
      });
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin', { replace: true });
  };

  const filteredUsers = users.filter((u) =>
    [u.name, u.email, u.phone, u.branch, u.roll_number, u.registration_number]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const filteredTeams = teams.filter((t) =>
    [t.team_id, t.team_name, t.leader_email, t.leader_name]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const filteredQuantum = quantum.filter((q) =>
    [q.uid, q.name, q.email, q.branch]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <h1>🛡️ Admin Dashboard</h1>
        <button className="admin-logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="admin-body">
        {/* Stats */}
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-label">Registered Users</div>
            <div className="stat-value">{stats.totalUsers}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Quimi Dexter Teams</div>
            <div className="stat-value">{stats.totalTeams}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Quantum Registrations</div>
            <div className="stat-value">{stats.totalQuantum}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Drafts Submitted</div>
            <div className="stat-value">{stats.totalDrafts}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}>Users</button>
          <button className={`admin-tab ${activeTab === 'teams' ? 'active' : ''}`}
            onClick={() => setActiveTab('teams')}>Quimi Dexter Teams</button>
          <button className={`admin-tab ${activeTab === 'quantum' ? 'active' : ''}`}
            onClick={() => setActiveTab('quantum')}>Quantum</button>
        </div>

        {/* Search */}
        <div className="admin-search">
          <input
            type="text"
            placeholder="Search by name, email, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Users Table */}
        {activeTab === 'overview' && (
          <div className="admin-section">
            <h2>All Registered Users ({filteredUsers.length})</h2>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Branch</th>
                    <th>Batch</th>
                    <th>Gender</th>
                    <th>Roll No</th>
                    <th>Reg No</th>
                    <th>Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, i) => (
                    <tr key={u.id}>
                      <td>{i + 1}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>{u.branch}</td>
                      <td>{u.batch}</td>
                      <td>{u.gender}</td>
                      <td>{u.roll_number}</td>
                      <td>{u.registration_number}</td>
                      <td>{formatDate(u.created_at)}</td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr><td colSpan={10} style={{ textAlign: 'center', padding: '30px', color: 'rgba(255,255,255,0.3)' }}>No users found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Teams Table */}
        {activeTab === 'teams' && (
          <div className="admin-section">
            <h2>Quimi Dexter Teams ({filteredTeams.length})</h2>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Team ID</th>
                    <th>Team Name</th>
                    <th>Leader</th>
                    <th>Member 1</th>
                    <th>Member 2</th>
                    <th>Member 3</th>
                    <th>Draft</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.map((t) => (
                    <tr key={t.id}>
                      <td style={{ color: '#ff7a00', fontWeight: 600 }}>{t.team_id}</td>
                      <td>{t.team_name}</td>
                      <td>
                        <div>{t.leader_name}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{t.leader_email}</div>
                      </td>
                      <td>
                        <div>{t.member1_name}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{t.member1_email}</div>
                      </td>
                      <td>
                        <div>{t.member2_name}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{t.member2_email}</div>
                      </td>
                      <td>
                        <div>{t.member3_name}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{t.member3_email}</div>
                      </td>
                      <td>
                        {t.draft_url ? (
                          <span className="badge-submitted">Submitted</span>
                        ) : (
                          <span className="badge-pending">Pending</span>
                        )}
                      </td>
                      <td>{formatDate(t.created_at)}</td>
                    </tr>
                  ))}
                  {filteredTeams.length === 0 && (
                    <tr><td colSpan={8} style={{ textAlign: 'center', padding: '30px', color: 'rgba(255,255,255,0.3)' }}>No teams found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quantum Table */}
        {activeTab === 'quantum' && (
          <div className="admin-section">
            <h2>Quantum Registrations ({filteredQuantum.length})</h2>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>UID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Branch</th>
                    <th>Batch</th>
                    <th>Gender</th>
                    <th>Roll No</th>
                    <th>Reg No</th>
                    <th>Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuantum.map((q) => (
                    <tr key={q.id}>
                      <td style={{ color: '#ff7a00', fontWeight: 600 }}>{q.uid}</td>
                      <td>{q.name}</td>
                      <td>{q.email}</td>
                      <td>{q.phone}</td>
                      <td>{q.branch}</td>
                      <td>{q.batch}</td>
                      <td>{q.gender}</td>
                      <td>{q.roll_number}</td>
                      <td>{q.registration_number}</td>
                      <td>{formatDate(q.created_at)}</td>
                    </tr>
                  ))}
                  {filteredQuantum.length === 0 && (
                    <tr><td colSpan={10} style={{ textAlign: 'center', padding: '30px', color: 'rgba(255,255,255,0.3)' }}>No registrations found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Branch Distribution */}
        <div className="admin-section" style={{ marginTop: '40px' }}>
          <h2>Branch Distribution</h2>
          <div className="admin-stats" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
            {[...new Set(users.map((u) => u.branch))].sort().map((branch) => {
              const count = users.filter((u) => u.branch === branch).length;
              return (
                <div className="stat-card" key={branch}>
                  <div className="stat-label" style={{ fontSize: '10px' }}>{branch}</div>
                  <div className="stat-value" style={{ fontSize: '28px' }}>{count}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="admin-section" style={{ marginTop: '20px' }}>
          <h2>Gender Distribution</h2>
          <div className="admin-stats" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
            <div className="stat-card">
              <div className="stat-label">Male</div>
              <div className="stat-value">{users.filter((u) => u.gender === 'Male').length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Female</div>
              <div className="stat-value">{users.filter((u) => u.gender === 'Female').length}</div>
            </div>
          </div>
        </div>

        {/* Batch Distribution */}
        <div className="admin-section" style={{ marginTop: '20px' }}>
          <h2>Batch Distribution</h2>
          <div className="admin-stats" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
            {['2K23', '2K24', '2K25'].map((batch) => {
              const count = users.filter((u) => u.batch === batch).length;
              return (
                <div className="stat-card" key={batch}>
                  <div className="stat-label">{batch}</div>
                  <div className="stat-value" style={{ fontSize: '28px' }}>{count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
