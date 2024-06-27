import React from 'react';
import { Box, Typography } from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Box 
      sx={{ 
        padding: 4, 
        bgcolor: '#fff', 
        borderRadius: '16px', 
        boxShadow: 3, 
        maxWidth: 800, 
        margin: '20px auto', 
        padding: '40px 20px',  // Adjusted padding
        mx: 2 // Adjusted margin on x-axis to add a gap between the screen boundary
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold', fontSize: 28 }}>
        Terms and Conditions
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontFamily: 'Inria Sans, sans-serif' }}>
        Welcome to UPLift! These terms and conditions outline the rules and regulations for the use of our application.
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold' }}>
        1. Introduction
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontFamily: 'Inria Sans, sans-serif' }}>
        By accessing this application, we assume you accept these terms and conditions. Do not continue to use UPLift if you do not agree to all of the terms and conditions stated on this page.
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold' }}>
        2. License
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontFamily: 'Inria Sans, sans-serif' }}>
        Unless otherwise stated, UPLift and/or its licensors own the intellectual property rights for all material on UPLift. All intellectual property rights are reserved. You may access this from UPLift for your own personal use subjected to restrictions set in these terms and conditions.
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold' }}>
        3. User Obligations
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontFamily: 'Inria Sans, sans-serif' }}>
        As a user of the application, you agree to provide true, accurate, current, and complete information about yourself and maintain the confidentiality of your account.
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold' }}>
        4. Governing Law
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontFamily: 'Inria Sans, sans-serif' }}>
        These terms and conditions are governed by and construed in accordance with the laws of our country and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold' }}>
        5. Changes to Terms
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontFamily: 'Inria Sans, sans-serif' }}>
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontFamily: 'Inria Sans, sans-serif' }}>
        If you have any questions about these Terms, please contact us.
      </Typography>
    </Box>
  );
};

export default TermsAndConditions;
