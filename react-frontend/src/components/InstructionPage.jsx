import React from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WelcomeImage from '../assets/images/stuck-at-home-imagination.svg';
import Step1Image from '../assets/images/Stuck-at-Home-Home-Office.svg';
import Step2Image from '../assets/images/Amigos-Outdoors.svg';
import Step3Image from '../assets/images/Croods-The-Feedback.svg';
import FacebookLogo from '../assets/images/facebook-logo.svg'; // Add the path to your Facebook logo
import InstagramLogo from '../assets/images/instagram-logo.svg'; // Add the path to your Instagram logo

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
            bottom: 50,
            right: 60,
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
            fontFamily: 'Inria Sans', 
            fontWeight: 'medium', 
            fontSize: '13px', 
            color: '#000000',
            mb: 4,
            mt: 6,
            lineHeight: 1.5,
            textAlign: 'left' // Align text to the left
          }}
        >
          Hey there, future financial superstar! 🌟 We're thrilled to have you join our community. Before you dive into the awesomeness, let's get you set up in just a few easy steps.
        </Typography>
      </Box>
      <Box sx={{ maxWidth: 800, width: '100%', margin: '0 auto', mb: 8, padding: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
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
            top: 196, // adjust this value as needed
            left: -11, // adjust this value as needed
            transform: 'translateX(56%)',
          }}
        >
          {/* Using this component for its white stroke */}
          Step 1!
        </Typography>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Inter', 
            fontWeight: 'bold', 
            fontSize: '20px', 
            color: '#ffc81a',
            textShadow: '0 4px 4px #ffffff',
            mb: 2,
            position: 'absolute',
            top: 193, // adjust this value as needed
            left: 25, // adjust this value as needed
            zIndex: 1
          }}
        >
          Step 1!
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ 
            fontFamily: 'Inria Sans', 
            fontWeight: 'medium', 
            fontSize: '13px', 
            color: '#000000',
            lineHeight: 1.5
          }}
        >
          To use our app, you'll need an Up Bank account. If you already have one, you're halfway there! If not, don't worry – it's super easy to get started. Click <a href="https://up.com.au/" target="_blank" rel="noopener noreferrer">here</a> to sign up for an Up Bank account. It only takes a few minutes!
        </Typography>
        <Box 
          component="img"
          src={Step1Image}
          alt="Home Office"
          sx={{
            position: 'absolute',
            bottom: 510,
            right: 15,
            width: '180px', 
            height: 'auto',
            zIndex: 2
          }}
        />
      </Box>
      <Box sx={{ maxWidth: 800, width: '100%', margin: '0 auto', mb: 14, padding: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
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
            top: 403, // adjust this value as needed
            left: -12, // adjust this value as needed
            transform: 'translateX(56%)',
          }}
        >
          {/* Using this component for its white stroke */}
          Step 2!
        </Typography>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Inter', 
            fontWeight: 'bold', 
            fontSize: '20px', 
            color: '#ffc81a',
            textShadow: '0 4px 4px #ffffff',
            mb: 2,
            position: 'absolute',
            top: 400, // adjust this value as needed
            left: 25, // adjust this value as needed
            zIndex: 1
          }}
        >
          Step 2!
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ 
            fontFamily: 'Inria Sans', 
            fontWeight: 'medium', 
            fontSize: '13px', 
            color: '#000000',
            lineHeight: 1.5
          }}
        >
          Now, this is where the magic happens! We need a special key (a Personal Access Token) from your Up Bank account to sync your data with our app. Click <a href="https://api.up.com.au/getting_started" target="_blank" rel="noopener noreferrer">here</a> to get your PAT!
        </Typography>
        <Box 
          component="img"
          src={Step2Image}
          alt="Amigos Outdoors"
          sx={{
            position: 'absolute',
            bottom: 316,
            right: 280,
            width: '140px', 
            height: 'auto',
            zIndex: 2
          }}
        />
      </Box>
      <Box sx={{ maxWidth: 800, width: '100%', margin: '0 auto', mb: 8, padding: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
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
            top: 638, // adjust this value as needed
            left: -13, // adjust this value as needed
            transform: 'translateX(56%)',
          }}
        >
          {/* Using this component for its white stroke */}
          Step 3!
        </Typography>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Inter', 
            fontWeight: 'bold', 
            fontSize: '20px', 
            color: '#ffc81a',
            textShadow: '0 4px 4px #ffffff',
            mb: 2,
            position: 'absolute',
            top: 635, // adjust this value as needed
            left: 25, // adjust this value as needed 
            zIndex: 1
          }}
        >
          Step 3!
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ 
            fontFamily: 'Inria Sans', 
            fontWeight: 'medium', 
            fontSize: '13px', 
            color: '#000000',
            lineHeight: 1.5
          }}
        >
          Almost there! Now, just hit the "Register" button below and paste your Personal Access Token after successfully registered. This will link your Up Bank account to our app, and voila! You're all set to start tracking, managing, and mastering your finances.
        </Typography>
        <Box 
          component="img"
          src={Step3Image}
          alt="Croods the Feedback"
          sx={{
            position: 'absolute',
            bottom: 64,
            right: 10,
            width: '150px', 
            height: 'auto',
            zIndex: 2
          }}
        />
      </Box>
      <Box sx={{ maxWidth: 800, width: '100%', margin: '0 auto', textAlign: 'left', mb: 4 }}>
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
            top: 875, // adjust this value as needed
            left: -55, // adjust this value as needed
            transform: 'translateX(56%)',
          }}
        >
          {/* Using this component for its white stroke */}
          Ready to Go?
        </Typography>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Inter', 
            fontWeight: 'bold', 
            fontSize: '20px', 
            color: '#ffc81a',
            mb: 2,
            zIndex: 1,
            position: "relative"
          }}
        >
          Ready to Go?
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ 
            fontFamily: 'Inria Sans', 
            fontWeight: 'medium', 
            fontSize: '13px', 
            color: '#000000',
            lineHeight: 1.5
          }}
        >
          Hit that "Register" button below to get started. We're excited to help you achieve your financial goals!
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Button 
          className="register-button"
          onClick={handleRegister}
        >
          Register
        </Button>
      </Box>
      <Box sx={{ width: '100vw', bgcolor: '#cad6ea', color: '#000000', padding: 2, mt: 4, textAlign: 'center', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', marginBottom: '-25vw' }}>
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

export default InstructionPage;
