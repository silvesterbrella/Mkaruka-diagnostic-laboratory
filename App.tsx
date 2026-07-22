import React, { Suspense, lazy } from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';
import React, { Suspense, lazy } from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles.css';
import { AuthProvider, useAuth } from './src/context/AuthContext';

import Home from './src/pages/Home';
import NotFound from './src/pages/NotFound';
import Login from './src/pages/Login';

const Register = lazy(() => import('./src/pages/Register'));
const Orders = lazy(() => import('./src/pages/Orders'));
const Results = lazy(() => import('./src/pages/Results'));
const Contact = lazy(() => import('./src/pages/Contact'));
const PatientPortal = lazy(() => import('./src/pages/PatientPortal'));

const ProtectedRoute: React.FC<{ children: React.ReactNode; roles?: string[] }> = ({ children, roles }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (roles && !roles.includes(user!.role)) return <Navigate to="/" />;
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      
      <Route path="/register" element={
        <ProtectedRoute roles={['admin', 'staff', 'doctor']}>
          <Register />
        </ProtectedRoute>
      } />
      
      <Route path="/orders" element={
        <ProtectedRoute roles={['admin', 'staff', 'doctor']}>
          <Orders />
        </ProtectedRoute>
      } />
      
      <Route path="/results" element={
        <ProtectedRoute roles={['admin', 'staff', 'doctor']}>
          <Results />
        </ProtectedRoute>
      } />

      <Route path="/portal" element={
        <ProtectedRoute roles={['patient']}>
          <PatientPortal />
        </ProtectedRoute>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Theme appearance="inherit" radius="large" scaling="100%">
      <AuthProvider>
        <Router>
          <Suspense fallback={
            <div className="min-h-screen bg-lab-navy flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-lab-teal/30 border-t-lab-teal rounded-full animate-spin" />
            </div>
          }>
            <AppContent />
          </Suspense>
          <ToastContainer position="top-right" autoClose={3000} />
        </Router>
      </AuthProvider>
    </Theme>
  );
};

export default App;
