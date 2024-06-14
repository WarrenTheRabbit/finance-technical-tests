import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PATPage = () => {
  const navigate = useNavigate();
  const [pat, setPat] = useState('');
  const [error, setError] = useState('');

  const handleAddPAT = () => {
    // Mock PAT logic
    if (pat === 'validPAT') {
      // Logic to handle valid PAT
      navigate('/processing');
    } else {
      setError('Your PAT has expired! / Invalid PAT! Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', bgcolor: '#f5f5f5' }}>
      <Box sx={{ width: 300, padding: 4, bgcolor: '#fff', borderRadius: '16px', boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom textAlign="center">Your PAT</Typography>
        <TextField label="Personal Access Token" variant="outlined" fullWidth margin="normal" value={pat} onChange={(e) => setPat(e.target.value)} />
        {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleAddPAT}>
          Add PAT
        </Button>
      </Box>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Step 1!</Typography>
        <Typography variant="body1">Open Up on your phone;</Typography>
        <Typography variant="h5" gutterBottom>Step 2!</Typography>
        <Typography variant="body1">Scroll across to the Up Tab;</Typography>
        <Typography variant="h5" gutterBottom>Step 3!</Typography>
        <Typography variant="body1">Select Scan QR Code then open this link;</Typography>
        <Typography variant="h5" gutterBottom>Step 4!</Typography>
        <Typography variant="body1">Scan the QR code, then follow the instructions;</Typography>
      </Box>
    </Box>
  );
};

export default PATPage;