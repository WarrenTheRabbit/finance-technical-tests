import useSWR, { mutate } from 'swr';
import React, { useState } from 'react';
import { Box, Typography, Grid, Button, Link } from '@mui/material';
import ProcessingPage from './ProcessingPage';
import TransportDonutChart from './TransportDonutChart';
import TransportTable from './TransportTable';
import FacebookLogo from '../assets/images/facebook-logo.svg';
import InstagramLogo from '../assets/images/instagram-logo.svg';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const Transport = () => {
  const [shouldFetch, setShouldFetch] = useState(true);
  const user = JSON.parse(localStorage.getItem('user')) || { email: '' };

  const { data: expenseData, error, isValidating } = useSWR(
    shouldFetch ? `http://localhost:8000/v1/category?user_id=${user.email}&category=Transport` : null,
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
    mutate(`http://localhost:8000/v1/category?user_id=${user.email}&category=Transport`);
  };

  if (isValidating) {
    return <ProcessingPage />;
  }

  return (
    <Box sx={{ padding: '20px', bgcolor: '#eff4f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 'bold', color: '#afbdc7', marginTop: '50px' }}>
        Transport
      </Typography>
      <Box sx={{ flexGrow: 1, padding: '20px', marginTop: '5px', bgcolor: "#fff", borderRadius: "16px", maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Inter', fontWeight: 'bold', color: '#808080', fontSize: '14px' }}>
          Expenses
        </Typography>
        <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
          <Grid item xs={12} md={6}>
            <TransportDonutChart data={expenseData || []} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TransportTable data={expenseData || []} />
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
      <Box sx={{ flexShrink: 0, width: '100vw', bgcolor: '#cad6ea', color: '#000000', padding: 2, textAlign: 'center', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', marginBottom: '-5vw' }}>
        <Typography
          variant="body2"
          paragraph
          sx={{
            fontFamily: 'Inria Sans',
            fontWeight: 'medium',
            fontSize: '10px',
            color: '#000000',
            lineHeight: 1.5,
            display: 'inline-block',
            marginRight: 2
          }}
        >
          Need help or have questions? Reach out to our support team anytime.
        </Typography>
        <Typography
          variant="body2"
          paragraph
          sx={{
            fontFamily: 'Inria Sans',
            fontWeight: 'medium',
            fontSize: '10px',
            color: '#000000',
            lineHeight: 1.5,
            mt: 0, // remove top margin to move the text closer
          }}
        >
          Enjoy the journey, The UPLift Team
        </Typography>
        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <Box component="img" src={FacebookLogo} alt="Facebook" sx={{ width: 24, height: 24, mx: 1 }} />
        </Link>
        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <Box component="img" src={InstagramLogo} alt="Instagram" sx={{ width: 24, height: 24, mx: 1 }} />
        </Link>
      </Box>
    </Box>
  );
};

export default Transport;
