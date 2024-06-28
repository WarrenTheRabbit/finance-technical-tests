import useSWR, { mutate } from 'swr';
import React, { useState } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import ExpenseDonutChart from './ExpenseDonutChart';
import ExpenseTable from './ExpenseTable';
import ProcessingPage from './ProcessingPage';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const Home = () => {
  const [shouldFetch, setShouldFetch] = useState(true);
  const user = JSON.parse(localStorage.getItem('user')) || { email: '' };

  const { data: expenseData, error, isValidating } = useSWR(
    shouldFetch ? `http://localhost:8000/v1/expenses?email=${user.email}&category=Good Life` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      shouldRetryOnError: false,
    }
  );

  const handleRefresh = () => {
    setShouldFetch(true);
    mutate(`http://localhost:8000/v1/expenses?email=${user.email}&category=Good Life`);
  };

  if (isValidating) {
    return <ProcessingPage />;
  }

  return (
    <Box sx={{ padding: '20px', bgcolor: '#eff4f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 'bold', color: '#afbdc7', marginTop: '50px' }}>
        Home
      </Typography>
      <Box sx={{ flexGrow: 1, padding: '20px', marginTop: '5px', bgcolor: "#fff", borderRadius: "16px", maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Inter', fontWeight: 'bold', color: '#808080', fontSize: '14px' }}>
          Total Expenses
        </Typography>
        <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
          <Grid item xs={12} md={6}>
            <ExpenseDonutChart data={expenseData || []} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ExpenseTable data={expenseData || []} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
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
    </Box>
  );
};

export default Home;
