import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WelcomeImage from '../assets/images/stuck-at-home-imagination.svg'

const InstructionPage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/signup');
  };

  return (
    <Box sx={{ padding: 2, bgcolor: '#eff4f7' }}>
      <Box sx={{ maxWidth: 800, width: '100%', textAlign: 'center', margin: '0 auto', pt: 4, position: 'relative' }}>
        <Box 
          component="img"
          src={WelcomeImage}
          alt="Welcome to UPLift"
          sx={{
            position: 'absolute',
            bottom: 12,
            right: 32,
            width: '80px', 
            height: 'auto',
            zIndex: 2
          }}
        />
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Inter', 
            fontWeight: 'bold', 
            fontSize: '20px', 
            color: '#f9c818', 
            lineHeight: "19px",
            textShadow: '8px 8px 14px rgba(0, 0, 0, 0.5)', // Outer shadow
            WebkitTextStroke: '11px white', // White border
            mb: 4,
            position: "absolute",
            transform: 'translateX(56%)',
          }}
        >
          {/* Using this component for its white stroke */}
          Welcome to UPLift!
        </Typography>
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Inter', 
            fontWeight: 'bold', 
            fontSize: '20px', 
            color: '#f9c818', 
            lineHeight: "19px",
            mb: 4,
            zIndex: 1,
            position: "relative"
          }}
        >
          {/* This is the text visible to user */}
          Welcome to UPLift!
        </Typography>
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Inter', 
            fontWeight: 'medium', 
            fontSize: '8px', 
            color: '#000000',
            mb: 4,
            lineHeight: 1.5
          }}
        >
          Hey there, future financial superstar! 🌟 We're thrilled to have you join our community. Before you dive into the awesomeness, let's get you set up in just a few easy steps.
        </Typography>
      </Box>
      <Box sx={{ maxWidth: 800, width: '100%', margin: '0 auto', mb: 4, padding: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Inter', 
            fontWeight: 'bold', 
            fontSize: '13px', 
            color: '#ffc81a',
            textShadow: '0 4px 4px #ffffff',
            mb: 2 
          }}
        >
          Step 1!
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ 
            fontFamily: 'Inter', 
            fontWeight: 'medium', 
            fontSize: '8px', 
            color: '#000000',
            lineHeight: 1.5
          }}
        >
          To use our app, you'll need an Up Bank account. If you already have one, you're halfway there! If not, don't worry – it's super easy to get started. Click <a href="https://up.com.au/" target="_blank" rel="noopener noreferrer">here</a> to sign up for an Up Bank account. It only takes a few minutes!
        </Typography>
      </Box>
      <Box sx={{ maxWidth: 800, width: '100%', margin: '0 auto', mb: 4, padding: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Inter', 
            fontWeight: 'bold', 
            fontSize: '13px', 
            color: '#ffc81a',
            textShadow: '0 4px 4px #ffffff',
            mb: 2 
          }}
        >
          Step 2!
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ 
            fontFamily: 'Inter', 
            fontWeight: 'medium', 
            fontSize: '8px', 
            color: '#000000',
            lineHeight: 1.5
          }}
        >
          Now, this is where the magic happens! We need a special key (a Personal Access Token) from your Up Bank account to sync your data with our app. Click <a href="https://api.up.com.au/getting_started" target="_blank" rel="noopener noreferrer">here</a> to get your PAT!
        </Typography>
      </Box>
      <Box sx={{ maxWidth: 800, width: '100%', margin: '0 auto', mb: 4, padding: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Inter', 
            fontWeight: 'bold', 
            fontSize: '13px', 
            color: '#ffc81a',
            textShadow: '0 4px 4px #ffffff',
            mb: 2 
          }}
        >
          Step 3!
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ 
            fontFamily: 'Inter', 
            fontWeight: 'medium', 
            fontSize: '8px', 
            color: '#000000',
            lineHeight: 1.5
          }}
        >
          Almost there! Now, just hit the "Register" button below and paste your Personal Access Token after successfully registered. This will link your Up Bank account to our app, and voila! You're all set to start tracking, managing, and mastering your finances.
        </Typography>
      </Box>
      <Box sx={{ maxWidth: 800, width: '100%', margin: '0 auto', textAlign: 'left', mb: 4 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Inter', 
            fontWeight: 'bold', 
            fontSize: '8px', 
            color: '#000000',
            mb: 2 
          }}
        >
          Ready to Go?
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ 
            fontFamily: 'Inter', 
            fontWeight: 'medium', 
            fontSize: '8px', 
            color: '#000000',
            lineHeight: 1.5
          }}
        >
          Hit that "Register" button below to get started. We're excited to help you achieve your financial goals!
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Button 
          variant="contained" 
          sx={{ 
            mt: 4, 
            padding: '10px 20px',
            fontFamily: 'Inter', 
            fontWeight: 'medium', 
            fontSize: '8px',
            bgcolor: '#4b99c1',
            '&:hover': {
              bgcolor: '#3572bd',
            }
          }} 
          onClick={handleRegister}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default InstructionPage;
