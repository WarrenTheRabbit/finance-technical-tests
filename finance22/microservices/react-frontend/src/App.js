import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import GoodLife from './components/GoodLife';  // Import new components
import Transport from './components/Transport';
import Personal from './components/Personal';
import Home from './components/Home';
import InstructionPage from './components/InstructionPage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import PATPage from './components/PATPage';
import TermsAndConditions from './components/TermsAndConditions';
import Details from './components/Details';
import Profile from './components/Profile';
import Contacts from './components/Contacts';

const AppContent = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState('dashboard');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || { firstName: '', lastName: '', avatar: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const showSidebar = ['dashboard', 'good-life', 'transport', 'personal', 'home'].includes(location.pathname.slice(1));

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {showSidebar && (
        <Sidebar user={user} onButtonClick={handleButtonClick} activeButton={activeButton} />
      )}
      <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<InstructionPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pat" element={<PATPage />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/good-life" element={<GoodLife />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </Box>
  );
};

const App = () => (
  <Router>
    <CssBaseline />
    <AppContent />
  </Router>
);

export default App;
