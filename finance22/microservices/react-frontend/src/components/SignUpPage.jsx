import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import logo from '../assets/images/logo.svg';
import axios from 'axios';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (email === '') {
      setEmailError('');
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email! Please try again!');
    } else {
      setEmailError('');
    }
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!terms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    setError('');

    try {
      const response = await axios.post('http://localhost:8000/v1/user', {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status === 201) {
        navigate('/login', { state: { registered: true } });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.detail);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', bgcolor: '#eff4f7' }}>
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <img src={logo} alt="Logo" style={{ width: '50px', marginBottom: '20px' }} />
      </Box>
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          mt: 2
        }}
      >
        <Box 
          sx={{ 
            width: 400, 
            padding: 4, 
            borderRadius: '25px', 
            boxShadow: 3,
            textAlign: 'center'
          }}
          style={{
            background: 'linear-gradient(90deg, #6760f1, #9362f1)',
          }}
        >
          <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: '#fff' }}>
            Sign Up
          </Typography>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ 
              backgroundColor: 'white', 
              borderRadius: '30px',
              boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
              fontFamily: 'Inria Sans',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
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
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ 
              backgroundColor: 'white', 
              borderRadius: '30px',
              boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
              fontFamily: 'Inria Sans',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
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
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            sx={{ 
              backgroundColor: 'white', 
              borderRadius: '30px',
              boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
              fontFamily: 'Inria Sans',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: emailError ? 'red' : 'rgba(0, 0, 0, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: emailError ? 'red' : 'rgba(0, 0, 0, 0.1)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: emailError ? 'red' : 'rgba(0, 0, 0, 0.1)',
                },
              },
            }}
            InputLabelProps={{
              style: { fontFamily: 'Inria Sans', color: emailError ? 'red' : 'rgba(0, 0, 0, 0.54)' },
            }}
            InputProps={{
              style: { fontFamily: 'Inria Sans', borderRadius: '30px', border: 'none' },
            }}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ 
              backgroundColor: 'white', 
              borderRadius: '30px',
              boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
              fontFamily: 'Inria Sans',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
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
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ 
              backgroundColor: 'white', 
              borderRadius: '30px',
              boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
              fontFamily: 'Inria Sans',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
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
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox 
                  icon={<CheckBoxOutlineBlankIcon sx={{ color: 'white' }} />} 
                  checkedIcon={<CheckBoxIcon sx={{ color: 'white' }} />}
                  checked={newsletter} 
                  onChange={(e) => setNewsletter(e.target.checked)} 
                  name="newsletter"
                  sx={{ '&.Mui-checked': { color: 'white' } }}
                />
              }
              label={<Typography sx={{ fontFamily: 'Inria Sans', fontSize: '0.75rem', color: '#fff', textAlign: 'left' }}>I wish to receive the newsletter and other promotional emails.</Typography>}
              sx={{ width: '100%' }}
            />
            <FormControlLabel
              control={
                <Checkbox 
                  icon={<CheckBoxOutlineBlankIcon sx={{ color: 'white' }} />} 
                  checkedIcon={<CheckBoxIcon sx={{ color: 'white' }} />}
                  checked={terms} 
                  onChange={(e) => setTerms(e.target.checked)} 
                  name="terms"
                  sx={{ '&.Mui-checked': { color: 'white' } }}
                />
              }
              label={
                <Typography sx={{ fontFamily: 'Inria Sans', fontSize: '0.75rem', color: '#fff' }}>
                  I have read and agree to the <Link to="/terms" style={{ color: '#fff' }}>terms and conditions</Link>.
                </Typography>
              }
            />
          </Box>
          {error && (
            <Box>
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>
              {error.includes('registered') && (
                <Button 
                  variant="contained" 
                  sx={{ 
                    mt: 2, 
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
                  onClick={() => navigate('/login')}
                >
                  Go to Login
                </Button>
              )}
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
              onClick={handleSignUp}
            >
              Sign up
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpPage;
