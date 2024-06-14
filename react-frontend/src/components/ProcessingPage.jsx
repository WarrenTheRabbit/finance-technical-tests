import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WelcomeImage from '../assets/images/stuck-at-home-imagination.svg'

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
      <Box sx={{ height: "100px", width: "auto", position: "relative" }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Commencing UPLift ...
        </Typography>
        <Box 
          component="img"
          src={WelcomeImage}
          alt="Commencing UPLift"
          sx={{
            position: 'absolute',
            height: 'auto',
            zIndex: 2,
            width: '132px',
            marginBottom: '20px',  
            animation: "bounce 2s infinite",
            top: "90%",
            left: "50%",
            transform: 'translate(-50%, -50%)', 
          }}
        /> 
      </Box>
      
      <Typography variant="h6" color="textSecondary" sx={{ mt: 8 }}>
        Creating graphs ...
      </Typography>
    </Box>
  );
};

export default ProcessingPage;
