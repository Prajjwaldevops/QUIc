-- ============================================================
-- QUIMICA 2026 — SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. USERS TABLE (with Clerk auth and batch)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  branch TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female')),
  roll_number TEXT UNIQUE NOT NULL,
  registration_number TEXT UNIQUE NOT NULL,
  batch TEXT NOT NULL CHECK (batch IN ('2K23', '2K24', '2K25')),
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index on clerk_id for fast lookups
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);

-- 2. QUIMI DEXTER TEAMS
CREATE TABLE IF NOT EXISTS quimi_dexter_teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id TEXT UNIQUE NOT NULL,
  team_name TEXT NOT NULL,
  leader_email TEXT NOT NULL REFERENCES users(email),
  member1_email TEXT NOT NULL REFERENCES users(email),
  member2_email TEXT NOT NULL REFERENCES users(email),
  member3_email TEXT NOT NULL REFERENCES users(email),
  leader_name TEXT,
  leader_phone TEXT,
  leader_roll TEXT,
  leader_reg TEXT,
  leader_gender TEXT,
  leader_branch TEXT,
  leader_batch TEXT,
  member1_name TEXT,
  member1_phone TEXT,
  member1_roll TEXT,
  member1_reg TEXT,
  member1_gender TEXT,
  member1_branch TEXT,
  member1_batch TEXT,
  member2_name TEXT,
  member2_phone TEXT,
  member2_roll TEXT,
  member2_reg TEXT,
  member2_gender TEXT,
  member2_branch TEXT,
  member2_batch TEXT,
  member3_name TEXT,
  member3_phone TEXT,
  member3_roll TEXT,
  member3_reg TEXT,
  member3_gender TEXT,
  member3_branch TEXT,
  member3_batch TEXT,
  draft_url TEXT,
  draft_submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. QUANTUM REGISTRATIONS (with batch)
CREATE TABLE IF NOT EXISTS quantum_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uid TEXT UNIQUE NOT NULL,
  user_email TEXT UNIQUE NOT NULL REFERENCES users(email),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  roll_number TEXT NOT NULL,
  registration_number TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female')),
  branch TEXT NOT NULL,
  batch TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. TEAM ID COUNTER
CREATE TABLE IF NOT EXISTS team_id_counter (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  next_id INT NOT NULL DEFAULT 0
);
INSERT INTO team_id_counter (id, next_id) VALUES (1, 0) ON CONFLICT DO NOTHING;

-- 5. QUANTUM UID COUNTER
CREATE TABLE IF NOT EXISTS quantum_uid_counter (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  next_id INT NOT NULL DEFAULT 1
);
INSERT INTO quantum_uid_counter (id, next_id) VALUES (1, 1) ON CONFLICT DO NOTHING;

-- ============================================================
-- FUNCTIONS: Atomic ID generation
-- ============================================================

CREATE OR REPLACE FUNCTION generate_team_id()
RETURNS TEXT AS $$
DECLARE
  current_val INT;
  new_id TEXT;
BEGIN
  UPDATE team_id_counter SET next_id = next_id + 1 WHERE id = 1 RETURNING next_id - 1 INTO current_val;
  new_id := '#TQD00' || LPAD(current_val::TEXT, 3, '0');
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_quantum_uid()
RETURNS TEXT AS $$
DECLARE
  current_val INT;
  new_uid TEXT;
BEGIN
  UPDATE quantum_uid_counter SET next_id = next_id + 1 WHERE id = 1 RETURNING next_id - 1 INTO current_val;
  new_uid := '#UID000' || LPAD(current_val::TEXT, 4, '0');
  RETURN new_uid;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE quimi_dexter_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE quantum_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_id_counter ENABLE ROW LEVEL SECURITY;
ALTER TABLE quantum_uid_counter ENABLE ROW LEVEL SECURITY;

-- Users: anon can read, insert, and update (for registration, sign-in, password reset)
CREATE POLICY "anon_select_users" ON users FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_users" ON users FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_users" ON users FOR UPDATE TO anon USING (true);

-- Quimi Dexter Teams: allow anon (since we don't use supabase auth)
CREATE POLICY "Anon read teams" ON quimi_dexter_teams FOR SELECT TO anon USING (true);
CREATE POLICY "Anon insert teams" ON quimi_dexter_teams FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon update teams" ON quimi_dexter_teams FOR UPDATE TO anon USING (true);

-- Quantum
CREATE POLICY "Anon read quantum" ON quantum_registrations FOR SELECT TO anon USING (true);
CREATE POLICY "Anon insert quantum" ON quantum_registrations FOR INSERT TO anon WITH CHECK (true);

-- Counters
CREATE POLICY "Anon read counter" ON team_id_counter FOR SELECT TO anon USING (true);
CREATE POLICY "Anon update counter" ON team_id_counter FOR UPDATE TO anon USING (true);
CREATE POLICY "Anon read quantum counter" ON quantum_uid_counter FOR SELECT TO anon USING (true);
CREATE POLICY "Anon update quantum counter" ON quantum_uid_counter FOR UPDATE TO anon USING (true);

-- ============================================================
-- IF UPDATING EXISTING SCHEMA, run clerk_migration.sql instead
-- ============================================================
