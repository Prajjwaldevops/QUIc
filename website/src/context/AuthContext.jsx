import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

// Simple SHA-256 hash using Web Crypto API
const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

const SESSION_KEY = 'quimica_session';

export const AuthProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if session exists in localStorage
  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Verify session is still valid (check expiry)
        if (parsed.email && parsed.expiry && Date.now() < parsed.expiry) {
          // Fetch fresh profile from DB
          fetchProfile(parsed.email).then((profile) => {
            if (profile) {
              setUserProfile(profile);
            } else {
              // Profile not found, clear session
              localStorage.removeItem(SESSION_KEY);
            }
            setLoading(false);
          });
          return;
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  // Fetch user profile from users table
  const fetchProfile = async (email) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();
    if (error || !data) return null;
    return data;
  };

  // Register a new user
  const register = async (formData) => {
    const passwordHash = await hashPassword(formData.password);

    // Check uniqueness
    const checks = [
      { field: 'email', value: formData.email.trim().toLowerCase(), label: 'Email' },
      { field: 'phone', value: formData.phone.trim(), label: 'Phone number' },
      { field: 'roll_number', value: formData.roll_number.trim().toUpperCase(), label: 'Roll number' },
      { field: 'registration_number', value: formData.registration_number.trim().toUpperCase(), label: 'Registration number' },
    ];

    for (const check of checks) {
      const { data: existing } = await supabase
        .from('users')
        .select('id')
        .eq(check.field, check.value)
        .single();

      if (existing) {
        return { error: `${check.label} "${check.value}" is already registered. Please sign in instead.` };
      }
    }

    // Insert user
    const { data, error } = await supabase
      .from('users')
      .insert({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        branch: formData.branch,
        gender: formData.gender,
        roll_number: formData.roll_number.trim().toUpperCase(),
        registration_number: formData.registration_number.trim().toUpperCase(),
        batch: formData.batch,
        password_hash: passwordHash,
      })
      .select()
      .single();

    if (error) {
      if (error.message.includes('duplicate')) {
        return { error: 'An account with these details already exists. Please sign in.' };
      }
      return { error: error.message };
    }

    // Save session
    saveSession(data);
    setUserProfile(data);
    return { data, error: null };
  };

  // Sign in with email/phone + password
  const signIn = async (emailOrPhone, password) => {
    const passwordHash = await hashPassword(password);

    let email = emailOrPhone.trim().toLowerCase();

    // If input is a phone number, look up the email
    const isPhone = /^\d{10}$/.test(emailOrPhone.trim());
    if (isPhone) {
      const { data: userData } = await supabase
        .from('users')
        .select('email')
        .eq('phone', emailOrPhone.trim())
        .single();

      if (!userData) {
        return { error: 'No account found with this phone number.' };
      }
      email = userData.email;
    }

    // Fetch user and verify password
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (!user) {
      return { error: 'No account found with this email. Please register first.' };
    }

    if (user.password_hash !== passwordHash) {
      return { error: 'Incorrect password. Please try again.' };
    }

    // Save session
    saveSession(user);
    setUserProfile(user);
    return { data: user, error: null };
  };

  // Save session to localStorage (30-day expiry)
  const saveSession = (user) => {
    const session = {
      email: user.email,
      name: user.name,
      expiry: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  };

  // Sign out
  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setUserProfile(null);
  };

  // Check if user is signed in
  const isSignedIn = () => {
    return !!userProfile;
  };

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        loading,
        register,
        signIn,
        signOut,
        isSignedIn,
        hashPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
