import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(location.state?.registered || false);

  const handleLogin = () => {
    // Retrieve user data from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      // Mock successful login
      navigate('/dashboard');
    } else {
      setError('Invalid email address / password! Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', bgcolor: '#f5f5f5' }}>
      {registered && (
        <Typography variant="h5" color="success" sx={{ mb: 2 }}>
          Registered Successfully!
        </Typography>
      )}
      <Box sx={{ width: 300, padding: 4, bgcolor: '#fff', borderRadius: '16px', boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom textAlign="center">Login</Typography>
        <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
          Sign in
        </Button>
        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          Don’t have an account? <a href="/signup">Register here!</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;