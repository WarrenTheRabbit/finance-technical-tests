import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Box, CssBaseline, Grid, Typography } from '@mui/material';
import Sidebar from './components/Sidebar';
import Transactions from './components/Transactions';
import About from './components/About';
import TopBox from './components/TopBox';
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

const expenseData = [
  { category: 'Good Life', amount: 500, percentage: 25 },
  { category: 'Home', amount: 1000, percentage: 50 },
  { category: 'Personal', amount: 300, percentage: 15 },
  { category: 'Transport', amount: 200, percentage: 10 },
];

const totalTransactions = expenseData.length;
const mostSpentCategory = expenseData.reduce((max, expense) => expense.amount > max.amount ? expense : max, expenseData[0]);
const mostSavedCategory = expenseData.reduce((min, expense) => expense.amount < min.amount ? expense : min, expenseData[0]);

const Dashboard = () => (
  <>
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Box sx={{ height: '100%' }}>
          <TopBox
            title="Transactions"
            value={`${totalTransactions} Transactions`}
            description={`+10 from last week`}
            icon="📈"
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ height: '100%' }}>
          <TopBox
            title={`Spent most on ${mostSpentCategory.category}`}
            value={`+$${mostSpentCategory.amount}`}
            description={`from last week`}
            icon="🏠"
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ height: '100%' }}>
          <TopBox
            title={`Saved most on ${mostSavedCategory.category}`}
            value={`+$${mostSavedCategory.amount}`}
            description={`from last week`}
            icon="💾"
          />
        </Box>
      </Grid>
    </Grid>
    <Box sx={{ padding: '20px', marginTop: 2, bgcolor: "#fff", borderRadius: "16px" }}>
      <Typography variant="h5" gutterBottom>
        Total Expenses
      </Typography>
      <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
        <Grid item xs={12} md={6}>
          <ExpenseDonutChart data={expenseData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ExpenseTable data={expenseData} />
        </Grid>
      </Grid>
    </Box>
  </>
);

const AppContent = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState('dashboard');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, backgroundColor: '#f5f5f5' }}>
      {location.pathname !== '/' && <Sidebar user={user} onButtonClick={handleButtonClick} activeButton={activeButton} />}
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
  );
};

const App = () => (
  <Router>
    <CssBaseline />
    <AppContent />
  </Router>
);

export default App;
