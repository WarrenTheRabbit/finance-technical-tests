import React from 'react';
import {  Grid, Box, Typography } from '@mui/material';

const FinancialOverview = ({ income, expenses, balance }) => (
  <Box sx={{ marginBottom: '20px' }}>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Box sx={{ padding: 2, textAlign: 'center', bgcolor: '#fff', color: '#677170', borderRadius: "16px" }}>
          <Typography variant="h6">Income</Typography>
          <Typography variant="h5">${income.toLocaleString()}</Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ padding: 2, textAlign: 'center', bgcolor: '#fff', color: '#677170', borderRadius: "16px" }}>
          <Typography variant="h6">Expenses</Typography>
          <Typography variant="h5">${expenses.toLocaleString(2)}</Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ padding: 2, textAlign: 'center', bgcolor: '#fff', color: '#677170', borderRadius: "16px" }}>
          <Typography variant="h6">Balance</Typography>
          <Typography variant="h5">${balance.toLocaleString(2)}</Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
);
export default FinancialOverview;
