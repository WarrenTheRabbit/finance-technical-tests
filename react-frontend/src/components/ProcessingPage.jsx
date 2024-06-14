import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProcessingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', bgcolor: '#f5f5f5' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Commencing UPLift ...
      </Typography>
      <img src="path/to/your/image.png" alt="Commencing UPLift" style={{ width: '200px', marginBottom: '20px' }} />
      <Typography variant="h6" color="textSecondary">
        Creating graphs ...
      </Typography>
    </Box>
  );
};

export default ProcessingPage;
