import useSWR, { mutate } from 'swr';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Box, CssBaseline, Grid, Typography, Button } from '@mui/material';
import Sidebar from './components/Sidebar';
import Transactions from './components/Transactions';
import About from './components/About';
import InstructionPage from './components/InstructionPage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import PATPage from './components/PATPage';
import TermsAndConditions from './components/TermsAndConditions';
import ProcessingPage from './components/ProcessingPage';
import ExpenseDonutChart from './components/ExpenseDonutChart';
import ExpenseTable from './components/ExpenseTable';

// Mock data
const user = {
  name: 'John Doe',
  avatar: 'https://via.placeholder.com/100',
  balance: 3000.00,
};

const fakeExpenseData = [
  { category: 'Good Life', amount: 500, percentage: 25 },
  { category: 'Home', amount: 1000, percentage: 50 },
  { category: 'Personal', amount: 300, percentage: 15 },
  { category: 'Transport', amount: 200, percentage: 10 },
];

const fetcher = (...args) => fetch(...args).then(res => res.json());

const Dashboard = () => {
  const { data: expenseData, error, isValidating } = useSWR('http://localhost:8000/v1/expenses', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 100000000,
  });

  if (isValidating) return "";

  console.log('Fetched data is: ' + expenseData);

  const handleRefresh = () => {
    mutate('http://localhost:8000/v1/expenses');
  };

  return (
    <>
      <Box sx={{ padding: '20px', margin: '20px', marginTop: '100px', bgcolor: "#fff", borderRadius: "16px", maxWidth: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Total Expenses
        </Typography>
        <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
          <Grid item xs={12} md={6}>
            <ExpenseDonutChart data={expenseData || fakeExpenseData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ExpenseTable data={expenseData || fakeExpenseData} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Button 
          variant="contained" 
          sx={{ 
            background: 'linear-gradient(to right, #8adbb1, #87ddc7)', 
            color: '#fff', 
            borderRadius: '25px', 
            padding: '10px 30px', 
            fontWeight: 'bold', 
            fontSize: '1rem',
            textTransform: 'uppercase',
            width: 'auto',
            minWidth: '150px',
            maxWidth: '250px'
          }} 
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </Box>
    </>
  );
};

const AppContent = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // State to track if user is logged in

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const showSidebar = location.pathname === '/dashboard';

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {isLoggedIn && showSidebar && (
        <Sidebar user={user} onButtonClick={handleButtonClick} activeButton={activeButton} />
      )}
      <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<InstructionPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pat" element={<PATPage />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/processing" element={<ProcessingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to InstructionPage */}
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
