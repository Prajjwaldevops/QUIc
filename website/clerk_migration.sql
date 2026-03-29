-- ============================================================
-- CLERK MIGRATION — Run this in your Supabase SQL Editor
-- This adds clerk_id and makes password_hash optional
-- ============================================================

-- 1. Add clerk_id column to link Supabase profile to Clerk user
ALTER TABLE users ADD COLUMN IF NOT EXISTS clerk_id TEXT;

-- 2. Make password_hash optional (Clerk handles passwords now)
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;

-- 3. Set default for password_hash so new inserts don't need it
ALTER TABLE users ALTER COLUMN password_hash SET DEFAULT '';

-- 4. Create index on clerk_id for fast lookups
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);
