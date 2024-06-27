import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import UFOAlien from '../assets/images/UFO-Alien.svg';
import SandDunes from '../assets/images/Sand-Dune.svg';
import Sidebar from './Sidebar';

const Contacts = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user')) || { firstName: '', lastName: '', avatar: '' };
  
  const handleSendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:8000/v1/contact', {
        name,
        email,
        message
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage('Failed to send message');
    }
  };

  const showSidebar = location.pathname === '/contacts';

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, backgroundColor: '#eff4f7', minHeight: '100vh', position: 'relative' }}>
      {showSidebar && (
        <Sidebar user={user} onButtonClick={() => {}} />
      )}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', bgcolor: '#eff4f7', position: 'relative' }}>
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <img src={UFOAlien} alt="UFO Alien" style={{ width: '150px', marginTop: '-40px' }} />
        </Box>
        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
              Contact Us
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              label="Message"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
            {responseMessage && <Typography color="success" variant="body2" sx={{ mt: 1 }}>{responseMessage}</Typography>}
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
                onClick={handleSendMessage}
              >
                Send Message
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ position: 'absolute', bottom: -8, textAlign: 'center', width: '100%' }}>
          <img src={SandDunes} alt="Sand Dunes" style={{ width: '430px', marginTop: '0px' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Contacts;
