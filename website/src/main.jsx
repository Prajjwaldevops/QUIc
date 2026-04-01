import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react';

// Context
import { AuthProvider } from './context/AuthContext';

// Route guards
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';

//Common Components
import Navbar from "./pages/navbar";
import Footer from "./pages/footer";

// Public pages
import HomePage from './pages/homePage';
import OurTeam from './pages/ourTeam';
import Events from './pages/event';
import Faculty from './pages/faculty';
import Quimica25 from "./pages/quimica25";
import Quimica23 from "./pages/quimica23";
import Newsletter from "./pages/newsletter";
import Achievements from "./pages/achievements";
import Gallery from "./pages/gallery";
import CourseStructure from "./pages/courseStructure";

// Auth pages
import Register from './pages/register';
import SignIn from './pages/signin';
import VerifyEmail from './pages/otpVerify';
import ForgotPassword from './pages/forgotPassword';

// Protected event pages
import Quimica26 from './pages/quimica26';
import QuantumRegister from './pages/quantumRegister';
import QuantumUid from './pages/quantumUid';

// Admin pages
import AdminLogin from './pages/adminLogin';
import AdminDashboard from './pages/adminDashboard';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  console.error('Missing VITE_CLERK_PUBLISHABLE_KEY in .env.local');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY || ''}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/ourTeam" element={<OurTeam />} />
          <Route path="/events" element={<Events />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/quimica23" element={<Quimica23 />} />
          <Route path="/quimica25" element={<Quimica25 />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/courseStructure" element={<CourseStructure />} />

          {/* Auth */}
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected — Quimica26 events (Quantum only) */}
          <Route path="/quimica26" element={<ProtectedRoute><Quimica26 /></ProtectedRoute>} />
          <Route path="/quimica26/quantum/register" element={<ProtectedRoute><QuantumRegister /></ProtectedRoute>} />
          <Route path="/quimica26/quantum/uid" element={<ProtectedRoute><QuantumUid /></ProtectedRoute>} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ClerkProvider>
);
