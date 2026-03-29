import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const { isLoaded: clerkLoaded, isSignedIn, user: clerkUser } = useUser();
  const { signOut: clerkSignOut } = useClerk();

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // When Clerk auth state changes, fetch/clear Supabase profile
  useEffect(() => {
    if (!clerkLoaded) return;

    if (isSignedIn && clerkUser) {
      const email = clerkUser.primaryEmailAddress?.emailAddress;
      if (email) {
        setLoading(true); // <-- FIX: Pause routing until we have the Supabase profile
        fetchProfile(email).then((profile) => {
          setUserProfile(profile);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } else {
      setUserProfile(null);
      setLoading(false);
    }
  }, [clerkLoaded, isSignedIn, clerkUser]);

  // Fetch user profile from Supabase users table
  const fetchProfile = async (email) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();
    if (error || !data) return null;
    return data;
  };

  // Insert profile into Supabase after Clerk registration + OTP verification
  const insertProfile = async (formData, clerkUserId) => {
    // Check uniqueness before inserting
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
        return { error: `${check.label} "${check.value}" is already registered.` };
      }
    }

    const { data, error } = await supabase
      .from('users')
      .insert({
        clerk_id: clerkUserId,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        branch: formData.branch,
        gender: formData.gender,
        roll_number: formData.roll_number.trim().toUpperCase(),
        registration_number: formData.registration_number.trim().toUpperCase(),
        batch: formData.batch,
        password_hash: formData.password_hash || '',
      })
      .select()
      .single();

    if (error) {
      if (error.message.includes('duplicate')) {
        return { error: 'An account with these details already exists.' };
      }
      return { error: error.message };
    }

    setUserProfile(data);
    return { data, error: null };
  };

  // Refresh the profile from Supabase (after profile changes)
  const refreshProfile = async () => {
    if (clerkUser) {
      const email = clerkUser.primaryEmailAddress?.emailAddress;
      if (email) {
        const profile = await fetchProfile(email);
        setUserProfile(profile);
        return profile;
      }
    }
    return null;
  };

  // Sign out — clears Clerk session
  const signOut = async () => {
    await clerkSignOut();
    setUserProfile(null);
  };

  // Check if user is signed in (both Clerk auth + Supabase profile)
  const isAuthenticated = () => {
    return isSignedIn && !!userProfile;
  };

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        loading,
        isSignedIn: isAuthenticated,
        clerkUser,
        clerkLoaded,
        insertProfile,
        refreshProfile,
        signOut,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
