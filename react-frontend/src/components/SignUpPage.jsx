import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

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

  const handleSignUp = () => {
    // Mock sign-up validation
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

    // Store user data in local storage
    const user = { firstName, lastName, email, password };
    localStorage.setItem('user', JSON.stringify(user));

    // Mock successful registration
    navigate('/login', { state: { registered: true } });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f5f5f5' }}>
      <Box sx={{ width: 300, padding: 4, bgcolor: '#fff', borderRadius: '16px', boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom textAlign="center">Sign Up</Typography>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} name="newsletter" />}
          label="I wish to receive the newsletter and other promotional emails."
        />
        <FormControlLabel
          control={<Checkbox checked={terms} onChange={(e) => setTerms(e.target.checked)} name="terms" />}
          label={
            <>
              I have read and agree to the <Link to="/terms">terms and conditions</Link>.
            </>
          }
        />
        {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
        <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} onClick={handleSignUp}>
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default SignUpPage;