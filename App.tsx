import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { DoctorDashboard } from './components/dashboards/DoctorDashboard';
import { ReceptionistDashboard } from './components/dashboards/ReceptionistDashboard';
import { PatientDashboard } from './components/dashboards/PatientDashboard';
import { PatientList } from './components/patients/PatientList';
import { ServiceList } from './components/services/ServiceList';
import { AppointmentList } from './components/appointments/AppointmentList';
import { Toaster } from './components/ui/sonner';
import { AppConfig } from './config/app';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');

  // Log system status on mount (development only)
  useEffect(() => {
    if (AppConfig.isDevelopment) {
      console.log('%c🏥 MedFlow - Système de Gestion Médicale', 'color: #2563eb; font-size: 16px; font-weight: bold;');
      console.log('%cMode:', 'font-weight: bold;', AppConfig.useEdgeFunctions ? 'Production (Edge Functions)' : 'Développement (Auth directe)');
      console.log('%c📚 Documentation:', 'font-weight: bold;', 'Consultez DEMARRAGE_RAPIDE.md pour commencer');
      
      // Uncomment to run full system check
      // import('./utils/systemCheck').then(({ logSystemCheck }) => {
      //   logSystemCheck();
      // });
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - show login or signup
  if (!user) {
    return showSignup ? (
      <SignupPage onNavigateToLogin={() => setShowSignup(false)} />
    ) : (
      <LoginPage onNavigateToSignup={() => setShowSignup(true)} />
    );
  }

  // Authenticated - show appropriate dashboard based on page and role
  const renderContent = () => {
    // Dashboard pages
    if (currentPage === 'dashboard') {
      switch (user.role) {
        case 'admin':
          return <AdminDashboard />;
        case 'doctor':
          return <DoctorDashboard />;
        case 'receptionist':
          return <ReceptionistDashboard />;
        case 'patient':
          return <PatientDashboard />;
        default:
          return (
            <div className="text-center">
              <h2>Rôle non reconnu</h2>
              <p className="text-gray-500">Veuillez contacter l'administrateur</p>
            </div>
          );
      }
    }

    // Patients page
    if (currentPage === 'patients') {
      return <PatientList />;
    }

    // Services page
    if (currentPage === 'services') {
      return <ServiceList />;
    }

    // Appointments page
    if (currentPage === 'appointments') {
      return <AppointmentList />;
    }

    // Default fallback
    return (
      <div className="text-center">
        <h2>Page en construction</h2>
        <p className="text-gray-500">Cette fonctionnalité sera bientôt disponible</p>
      </div>
    );
  };

  return (
    <DashboardLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster />
    </AuthProvider>
  );
}