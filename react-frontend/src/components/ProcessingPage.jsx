import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WelcomeImage from '../assets/images/stuck-at-home-imagination.svg'

const ProcessingPage = () => {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('Creating graphs ...');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 15000);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    const switchTextTimer = setInterval(() => {
      setDisplayText((prevText) => prevText === 'Creating graphs ...' ? 'Creating tables ...' : 'Creating graphs ...');
    }, 7000);

    return () => clearInterval(switchTextTimer);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', bgcolor: '#eff4f7' }}>
      <Box sx={{ textAlign: 'center', position: 'relative', mt: 4 }}>
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Inter', 
            fontWeight: 'bold', 
            fontSize: '26px', 
            color: '#f9c818', 
            lineHeight: "19px",
            textShadow: '8px 8px 14px rgba(0, 0, 0, 0.5)', // Outer shadow
            WebkitTextStroke: '11px white', // White border
            mb: 4,
            position: "absolute",
            transform: 'translateX(-50%)',
            left: '50%',
            top: 0, // Adjusted value to move the text up
            whiteSpace: 'nowrap',
          }}
        >
          {/* Using this component for its white stroke */}
          Commencing UPLift ...
        </Typography>
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Inter', 
            fontWeight: 'bold', 
            fontSize: '26px', 
            color: '#f9c818', 
            lineHeight: "19px",
            mb: 4,
            position: "relative",
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            top: 0, // Adjusted value to move the text up
            whiteSpace: 'nowrap',
          }}
        >
          {/* This is the text visible to user */}
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
            top: "150%",
            left: "50%",
            transform: 'translate(-50%, -50%)', 
          }}
        /> 
      </Box>
      <Typography 
        variant="h6" 
        sx={{ 
          mt: 12, 
          fontSize: '16px', 
          fontWeight: 'bold', 
          fontFamily: 'Inria Sans', 
          background: 'linear-gradient(180deg, #6861f2, #9262f2)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent' 
        }}
      >
        {displayText}
      </Typography>
    </Box>
  );
};

export default ProcessingPage;
