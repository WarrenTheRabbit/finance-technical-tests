import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InstructionPage = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/signup');
  };

  return (
    <Box sx={{ padding: '20px', bgcolor: '#f5f5f5', borderRadius: '16px', textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>Welcome to UPLift!</Typography>
      <Typography variant="body1" gutterBottom>
        Hey there, future financial superstar! 🎉 We're thrilled to have you join our community. Before you dive into the awesomeness, let's get you set up in just a few easy steps.
      </Typography>
      <Typography variant="h5" gutterBottom>Step 1!</Typography>
      <Typography variant="body1" gutterBottom>
        To use our app, you'll need an Up Bank account. If you already have one, you're halfway there! If not, don't worry – it's super easy to get started. Click <a href="#">here</a> to sign up for an Up Bank account. It only takes a few minutes!
      </Typography>
      <Typography variant="h5" gutterBottom>Step 2!</Typography>
      <Typography variant="body1" gutterBottom>
        Now, this is where the magic happens! We need a special key (a Personal Access Token) from your Up Bank account to sync your data with our app. Click <a href="#">here</a> to get your PAT!
      </Typography>
      <Typography variant="h5" gutterBottom>Step 3!</Typography>
      <Typography variant="body1" gutterBottom>
        Almost there! Now, just hit the "Register" button below and paste your Personal Access Token after successfully registered. This will link your Up Bank account to our app, and voila! You're all set to start tracking, managing, and mastering your finances.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleRegisterClick} sx={{ marginTop: 2 }}>
        Register
      </Button>
    </Box>
  );
};

export default InstructionPage;