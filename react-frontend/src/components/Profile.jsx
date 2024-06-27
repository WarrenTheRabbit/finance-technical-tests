import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Avatar, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { styled } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user')) || { firstName: '', lastName: '', email: '', phone: '', avatar: '' };

  const [name, setName] = useState(user.firstName + ' ' + user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [avatar, setAvatar] = useState(user.avatar);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    const [firstName, lastName] = name.split(' ');
    const updatedUser = { ...user, firstName, lastName, email, phone, avatar };
    try {
      await axios.put(`http://localhost:8000/v1/user/${user.id}`, updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile', error);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const StyledAvatar = styled(Avatar)({
    width: 100,
    height: 100,
    cursor: 'pointer',
    position: 'relative'
  });

  const AvatarOverlay = styled(Box)({
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  });

  const showSidebar = location.pathname === '/profile';

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, backgroundColor: '#eff4f7', minHeight: '100vh' }}>
      {showSidebar && (
        <Sidebar user={user} onButtonClick={() => {}} activeButton="profile" />
      )}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', bgcolor: '#eff4f7', position: 'relative' }}>
        <Box 
          sx={{ 
            width: 400, 
            padding: 4, 
            borderRadius: '25px', 
            boxShadow: 3,
            textAlign: 'center',
            position: 'relative'
          }}
          style={{
            background: 'linear-gradient(90deg, #6760f1, #9362f1)',
          }}
        >
          {isEditing ? (
            <>
              <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: '#fff' }}>
                Edit My Profile
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2, position: 'relative' }}>
                <StyledAvatar src={avatar} alt="Profile Picture">
                  <IconButton component="label">
                    <AddPhotoAlternateIcon sx={{ color: '#fff' }} />
                    <input type="file" hidden onChange={handleAvatarChange} />
                  </IconButton>
                </StyledAvatar>
              </Box>
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
                label="Phone No."
                variant="outlined"
                fullWidth
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                  onClick={handleSaveProfile}
                >
                  Confirm
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: '#fff' }}>
                My Profile
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                <Avatar src={avatar} alt="Profile Picture" sx={{ width: 100, height: 100 }} />
              </Box>
              <Typography variant="body1" sx={{ fontFamily: 'Inria Sans', color: '#fff', marginBottom: 1 }}>
                <strong>Name</strong>: {name}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Inria Sans', color: '#fff', marginBottom: 1 }}>
                <strong>Email</strong>: {email}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Inria Sans', color: '#fff', marginBottom: 2 }}>
                <strong>Phone No.</strong>: {phone}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button 
                  variant="contained" 
                  sx={{ 
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
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
