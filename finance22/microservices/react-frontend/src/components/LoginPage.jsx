import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/images/logo.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(location.state?.registered || false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/v1/user', {
        username: username,
        password: password
      });
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/pat');
    } catch (err) {
      setError(err.response ? err.response.data.detail : 'Login failed');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', bgcolor: '#eff4f7' }}>
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <img src={logo} alt="Logo" style={{ width: '50px', marginTop: '50px' }} />
      </Box>
      {registered && (
        <Box sx={{ position: 'relative', mt: 2 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontFamily: 'Inter',
              fontWeight: 'bold',
              fontSize: '20px',
              color: '#f9c818',
              lineHeight: "19px",
              textShadow: '8px 8px 14px rgba(0, 0, 0, 0.5)',
              WebkitTextStroke: '11px white',
              mb: 2,
              position: "absolute",
              transform: 'translateX(-50%)',
              left: '50%',
              top: 140,
              whiteSpace: 'nowrap'
            }}
          >
            Registered Successfully!
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontFamily: 'Inter',
              fontWeight: 'bold',
              fontSize: '20px',
              color: '#f9c818',
              lineHeight: "19px",
              mb: 2,
              position: "relative",
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1,
              top: 140,
            }}
          >
            Registered Successfully!
          </Typography>
        </Box>
      )}
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
            textAlign: 'center'
          }}
          style={{
            background: 'linear-gradient(90deg, #6760f1, #9362f1)',
          }}
        >
          <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: '#fff' }}>
            Login
          </Typography>
          <TextField
            placeholder="username"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            placeholder="password"
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
          {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
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
              onClick={handleLogin}
            >
              Sign in
            </Button>
          </Box>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ mt: 2, color: '#fff', fontFamily: 'Inria Sans', fontWeight: 'regular' }}
          >
            Don’t have an account?
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: '#fff', fontFamily: 'Inria Sans', fontWeight: 'bold' }}
          >
            <Link
              to="/signup"
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              Register here!
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
