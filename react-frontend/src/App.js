import React, { useState }  from 'react';
import { Container, Box, Grid, Typography } from '@mui/material'; 
import Sidebar from './components/Sidebar';
import FinancialOverview from './components/FinancialOverview';
import ExpenseDonutChart from './components/ExpenseDonutChart';
import ExpenseTable from './components/ExpenseTable';
import Transactions from './components/Transactions';
import About from './components/About';
import TopBox from './components/TopBox';

// todo - use data from backend when endpoint is ready
const user = {
  name: 'John Doe',
  avatar: 'https://via.placeholder.com/100',
  balance: 3000.00,
};

// todo - use data from backend when endpoint is ready
const financialData = {
  income: 5000,
  expenses: 2000,
};

// todo - use data from backend when endpoint is ready
const expenseData = [
  { category: 'Good Life', amount: 500, percentage: 25 },
  { category: 'Home', amount: 1000, percentage: 50 },
  { category: 'Personal', amount: 300, percentage: 15 },
  { category: 'Transport', amount: 200, percentage: 10 },
];

// Calculate total transactions, most spent category, and most saved category
const totalTransactions = expenseData.length;
const mostSpentCategory = expenseData.reduce((max, expense) => expense.amount > max.amount ? expense : max, expenseData[0]);
const mostSavedCategory = expenseData.reduce((min, expense) => expense.amount < min.amount ? expense : min, expenseData[0]);

const App = () => {
  const [activeButton, setActiveButton] = useState('dashboard');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  let content;
  switch (activeButton) {
    case 'dashboard':
      content = (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TopBox
                title="Transactions"
                value={`${totalTransactions} Transactions`}
                description={`+10 from last week`}
                icon="📈"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TopBox
                title={`Spent most on ${mostSpentCategory.category}`}
                value={`+$${mostSpentCategory.amount}`}
                description={`from last week`}
                icon="🏠"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TopBox
                title={`Saved most on ${mostSavedCategory.category}`}
                value={`+$${mostSavedCategory.amount}`}
                description={`from last week`}
                icon="💾"
              />
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
      break;
    case 'transactions':
      content = <Transactions />;
      break;
    case 'about':
      content = <About />;
      break;
    default:
      content = null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, backgroundColor: '#f5f5f5' }}>
      <Sidebar user={user} onButtonClick={handleButtonClick} activeButton={activeButton} />   
      <Container sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', padding: { xs: 2, md: 3 } }}>
        <Box sx={{ marginY: 2 }}>
          {content}
        </Box>
      </Container>
    </Box>
  )
};

export default App;
