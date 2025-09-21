import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/common/Navbar';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import TankerMarketplace from './pages/TankerMarketplace';
import SocietyDashboard from './pages/SocietyDashboard';
import ConservationHub from './pages/ConservationHub';
import { authAPI } from './services/authAPI';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authAPI.getCurrentUser()
        .then(data => setUser(data.user))
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-water-500"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'dark:bg-gray-800 dark:text-gray-100',
            }}
          />

          {user && <Navbar user={user} setUser={setUser} />}

          <Routes>
            <Route
              path="/login"
              element={!user ? <AuthPage setUser={setUser} /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/tankers"
              element={user ? <TankerMarketplace /> : <Navigate to="/login" />}
            />
            <Route
              path="/society"
              element={user?.userType === 'society' ? <SocietyDashboard /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/conservation"
              element={user ? <ConservationHub /> : <Navigate to="/login" />}
            />
            <Route
              path="/"
              element={<Navigate to={user ? "/dashboard" : "/login"} />}
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
