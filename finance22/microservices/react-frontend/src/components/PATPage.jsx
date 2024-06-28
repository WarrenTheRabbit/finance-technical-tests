import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/images/logo.svg';

const PATPage = () => {
  const navigate = useNavigate();
  const [pat, setPat] = useState('');
  const [error, setError] = useState('');

  const handleAddPAT = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/v1/pat', { pat });
      if (response.data.message === "PAT is valid") {
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.detail);
      } else {
        setError('Your PAT has expired! / Invalid PAT! Please try again.');
      }
    }
  };

  const handlePatChange = (e) => {
    setPat(e.target.value);
    if (e.target.value === '') {
      setError('');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', bgcolor: '#eff4f7' }}>
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <img src={logo} alt="Logo" style={{ width: '50px', marginTop: '50px' }} />
      </Box>
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
          width: '100%',
        }}
      >
        <Box 
          sx={{ 
            width: 400, 
            padding: 4, 
            borderRadius: '25px', 
            boxShadow: 3,
            textAlign: 'center',
            marginTop: -15,
          }}
          style={{
            background: 'linear-gradient(90deg, #6760f1, #9362f1)',
          }}
        >
          <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: '#fff', mb: 5 }}>
            Your PAT
          </Typography>
          <Typography variant="body1" sx={{ color: '#fff', fontFamily: 'Inria Sans', fontSize: 14, mb: 2, textAlign: 'left' }}>
            Instruction: Please click <Link href="https://api.up.com.au/getting_started" target="_blank" rel="noopener noreferrer" sx={{ color: '#fff', textDecoration: 'underline' }}>this link</Link>, follow the instructions on that page and paste your token below.
          </Typography>
          <TextField
            label="Personal Access Token"
            variant="outlined"
            fullWidth
            margin="normal"
            value={pat}
            onChange={handlePatChange}
            sx={{ 
              backgroundColor: 'white', 
              borderRadius: '30px',
              boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
              fontFamily: 'Inria Sans',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)', // Default grey color
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)', // Default grey color
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)', // Default grey color when focused
                },
              },
            }}
            InputLabelProps={{
              style: { fontFamily: 'Inria Sans', color: 'rgba(0, 0, 0, 0.54)' },
            }}
            InputProps={{
              style: { fontFamily: 'Inria Sans', borderRadius: '30px', border: 'none' },
            }}
          />
          {error && <Typography color="error" variant="body2" sx={{ mt: 1, fontSize: '0.8rem' }}>{error}</Typography>}
          <Button 
            variant="contained" 
            sx={{ 
              marginTop: 2, 
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
            onClick={handleAddPAT}
          >
            Add PAT
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PATPage;
