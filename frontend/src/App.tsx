import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { OnboardingPersonaPage } from './pages/OnboardingPersonaPage';
import { StudentVerificationPage } from './pages/StudentVerificationPage';
import { DashboardPage } from './pages/DashboardPage';
import { NewPaperPage } from './pages/NewPaperPage';
import { GenerationTrackerModal } from './pages/GenerationTrackerModal';
import { PaperViewPage } from './pages/PaperViewPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { BillingPage } from './pages/BillingPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Protected Routes */}
          <Route
            path="/onboarding/persona"
            element={
              <ProtectedRoute>
                <OnboardingPersonaPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboarding/student-verification"
            element={
              <ProtectedRoute>
                <StudentVerificationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/papers"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generator"
            element={
              <ProtectedRoute>
                <NewPaperPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tracker/:id"
            element={
              <ProtectedRoute>
                <GenerationTrackerModal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/papers/:id"
            element={
              <ProtectedRoute>
                <PaperViewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/downloads/:id"
            element={
              <ProtectedRoute>
                <DownloadsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing"
            element={
              <ProtectedRoute>
                <BillingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
