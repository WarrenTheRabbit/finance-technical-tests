import React, { useState } from 'react';
import { Avatar, Box, Divider, IconButton, Typography, Drawer, List, ListItem, ListItemText, Toolbar, AppBar, IconButton as MuiIconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const CustomMenuIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  '& div': {
    width: '20px',
    height: '3px',
    backgroundColor: '#fff',
    margin: '2px 0',
    borderRadius: '3px',
    transition: 'all 0.3s ease',
  },
  '& div:nth-of-type(1)': {
    width: '20px',
  },
  '& div:nth-of-type(2)': {
    width: '15px',
  },
  '& div:nth-of-type(3)': {
    width: '10px',
  },
}));

const Sidebar = ({ user, onButtonClick, activeButton }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    onButtonClick(path);
    navigate(`/${path}`);
  };

  const drawer = (
    <Box 
      sx={{ 
        width: 100, 
        height: '100%', 
        bgcolor: '#eff4f7', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)',
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '20px',
        position: 'fixed', // Fixed positioning to ensure no background behind the sidebar
      }}
    >
      <Box sx={{ padding: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar alt={user.name} src={user.avatar} sx={{ width: 50, height: 50, marginTop: 2, marginBottom: 1 }} />
        <Typography variant="body1" sx={{ fontFamily: 'Inria Sans', fontWeight: 'bold', textAlign: 'center' }}>{user.name}</Typography>
        <Divider sx={{ width: '80%', marginTop: 1, marginBottom: 1 }} />
      </Box>

      <List sx={{ width: '100%' }}>
        <ListItem button onClick={() => handleNavigation('dashboard')} selected={activeButton === 'dashboard'} sx={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 2 }}>
          <HomeIcon sx={{ marginBottom: 0.5 }} />
          <ListItemText primary="Home" primaryTypographyProps={{ fontFamily: 'Inria Sans', fontWeight: 'bold' }} />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('details')} selected={activeButton === 'details'} sx={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 2 }}>
          <DescriptionIcon sx={{ marginBottom: 0.5 }} />
          <ListItemText primary="Details" primaryTypographyProps={{ fontFamily: 'Inria Sans', fontWeight: 'bold' }} />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('profile')} selected={activeButton === 'profile'} sx={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 2 }}>
          <AccountBoxIcon sx={{ marginBottom: 0.5 }} />
          <ListItemText primary="My Profile" primaryTypographyProps={{ fontFamily: 'Inria Sans', fontWeight: 'bold' }} />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('contacts')} selected={activeButton === 'contacts'} sx={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 2 }}>
          <ContactMailIcon sx={{ marginBottom: 0.5 }} />
          <ListItemText primary="Contact" primaryTypographyProps={{ fontFamily: 'Inria Sans', fontWeight: 'bold' }} />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('*')} selected={activeButton === '*'} sx={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: 'auto', marginBottom: 2 }}>
          <ExitToAppIcon sx={{ marginBottom: 0.5 }} />
          <ListItemText primary="Sign Out" primaryTypographyProps={{ fontFamily: 'Inria Sans', fontWeight: 'bold' }} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ display: { xs: 'flex', md: 'none' }, backgroundColor: '#384049' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <MuiIconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <CustomMenuIcon>
              <div></div>
              <div></div>
              <div></div>
            </CustomMenuIcon>
          </MuiIconButton>
          <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center', fontFamily: 'Jomhuria', fontSize: '48px', background: 'linear-gradient(90deg, #4b99c1, #3572bd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', ml: '-24px' }}>
            UPLift
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 120 },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        sx={{ 
          width: { md: 120 }, 
          flexShrink: { md: 0 }, 
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          height: '100vh',
          bgcolor: '#eff4f7',
          boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)',
          borderTopRightRadius: '20px',
          borderBottomRightRadius: '20px',
          position: 'fixed' // Fixed positioning to ensure no background behind the sidebar
        }}
      >
        {drawer}
      </Box>
    </>
  );
};

export default Sidebar;
