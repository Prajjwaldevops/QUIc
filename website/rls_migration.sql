-- ============================================================
-- QUIMICA 2026 — RLS MIGRATION SCRIPT
-- Run this in Supabase SQL Editor to fix all policies
-- This drops old policies and creates new ones for anon access
-- ============================================================

-- ===================== DROP OLD POLICIES =====================
-- (These will silently succeed even if the policy doesn't exist)

-- Users
DROP POLICY IF EXISTS "Users can read all users" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Anon can check users" ON users;
DROP POLICY IF EXISTS "Anon can insert users" ON users;
DROP POLICY IF EXISTS "Anyone can read users" ON users;
DROP POLICY IF EXISTS "Anyone can insert users" ON users;
DROP POLICY IF EXISTS "Auth users can read" ON users;

-- Quimi Dexter Teams
DROP POLICY IF EXISTS "Read teams" ON quimi_dexter_teams;
DROP POLICY IF EXISTS "Insert teams" ON quimi_dexter_teams;
DROP POLICY IF EXISTS "Update own team draft" ON quimi_dexter_teams;
DROP POLICY IF EXISTS "Anon read teams" ON quimi_dexter_teams;
DROP POLICY IF EXISTS "Anon insert teams" ON quimi_dexter_teams;
DROP POLICY IF EXISTS "Anon update teams" ON quimi_dexter_teams;

-- Quantum
DROP POLICY IF EXISTS "Read quantum" ON quantum_registrations;
DROP POLICY IF EXISTS "Insert quantum" ON quantum_registrations;
DROP POLICY IF EXISTS "Anon read quantum" ON quantum_registrations;
DROP POLICY IF EXISTS "Anon insert quantum" ON quantum_registrations;

-- Counters
DROP POLICY IF EXISTS "Read counter" ON team_id_counter;
DROP POLICY IF EXISTS "Update counter" ON team_id_counter;
DROP POLICY IF EXISTS "Anon read counter" ON team_id_counter;
DROP POLICY IF EXISTS "Anon update counter" ON team_id_counter;
DROP POLICY IF EXISTS "Read quantum counter" ON quantum_uid_counter;
DROP POLICY IF EXISTS "Update quantum counter" ON quantum_uid_counter;
DROP POLICY IF EXISTS "Anon read quantum counter" ON quantum_uid_counter;
DROP POLICY IF EXISTS "Anon update quantum counter" ON quantum_uid_counter;

-- ===================== ENABLE RLS =====================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE quimi_dexter_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE quantum_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_id_counter ENABLE ROW LEVEL SECURITY;
ALTER TABLE quantum_uid_counter ENABLE ROW LEVEL SECURITY;

-- ===================== CREATE NEW POLICIES =====================
-- All policies target 'anon' since we use custom auth (not Supabase Auth)

-- USERS: anon can read (for sign-in checks) + insert (for registration) + update (for password reset)
CREATE POLICY "anon_select_users" ON users FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_users" ON users FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_users" ON users FOR UPDATE TO anon USING (true);

-- QUIMI DEXTER TEAMS: anon can read + insert + update (for draft submission)
CREATE POLICY "anon_select_teams" ON quimi_dexter_teams FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_teams" ON quimi_dexter_teams FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_teams" ON quimi_dexter_teams FOR UPDATE TO anon USING (true);

-- QUANTUM: anon can read + insert
CREATE POLICY "anon_select_quantum" ON quantum_registrations FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_quantum" ON quantum_registrations FOR INSERT TO anon WITH CHECK (true);

-- COUNTERS: anon can read + update (for ID generation via RPC)
CREATE POLICY "anon_select_team_counter" ON team_id_counter FOR SELECT TO anon USING (true);
CREATE POLICY "anon_update_team_counter" ON team_id_counter FOR UPDATE TO anon USING (true);
CREATE POLICY "anon_select_quantum_counter" ON quantum_uid_counter FOR SELECT TO anon USING (true);
CREATE POLICY "anon_update_quantum_counter" ON quantum_uid_counter FOR UPDATE TO anon USING (true);

-- ===================== COLUMN MIGRATIONS =====================
-- Run these if your tables already exist and need updating:

ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS batch TEXT DEFAULT '2K25';
ALTER TABLE users DROP COLUMN IF EXISTS auth_id;

ALTER TABLE quantum_registrations ADD COLUMN IF NOT EXISTS batch TEXT DEFAULT '2K25';

ALTER TABLE quimi_dexter_teams ADD COLUMN IF NOT EXISTS leader_batch TEXT;
ALTER TABLE quimi_dexter_teams ADD COLUMN IF NOT EXISTS member1_batch TEXT;
ALTER TABLE quimi_dexter_teams ADD COLUMN IF NOT EXISTS member2_batch TEXT;
ALTER TABLE quimi_dexter_teams ADD COLUMN IF NOT EXISTS member3_batch TEXT;

-- ===================== DONE =====================
-- You should see "Success. No rows returned" if everything ran correctly.
