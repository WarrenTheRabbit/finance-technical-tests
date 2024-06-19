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

    const user = { firstName, lastName, email, password };
    localStorage.setItem('user', JSON.stringify(user));

    navigate('/login', { state: { registered: true } });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#eff4f7' }}>
      <Box sx={{ width: 400, padding: 4, bgcolor: 'linear-gradient(90deg, #9362f1, #6760f1)', borderRadius: '25px', boxShadow: 3 }}>
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
          sx={{ backgroundColor: 'white', borderRadius: '8px' }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{ backgroundColor: 'white', borderRadius: '8px' }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ backgroundColor: 'white', borderRadius: '8px' }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ backgroundColor: 'white', borderRadius: '8px' }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ backgroundColor: 'white', borderRadius: '8px' }}
        />
        <FormControlLabel
          control={<Checkbox checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} name="newsletter" />}
          label="I wish to receive the newsletter and other promotional emails."
          sx={{ color: '#fff' }}
        />
        <FormControlLabel
          control={<Checkbox checked={terms} onChange={(e) => setTerms(e.target.checked)} name="terms" />}
          label={
            <>
              I have read and agree to the <Link to="/terms" style={{ color: '#fff' }}>terms and conditions</Link>.
            </>
          }
          sx={{ color: '#fff' }}
        />
        {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
        <Button variant="contained" fullWidth sx={{ marginTop: 2, bgcolor: '#34d399', color: '#fff', borderRadius: '25px' }} onClick={handleSignUp}>
          Sign in
        </Button>
      </Box>
    </Box>
  );
};

export default SignUpPage;
