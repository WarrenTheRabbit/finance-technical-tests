import React, { useState } from 'react';
import { Avatar, Box, Divider, IconButton, Typography, Drawer, List, ListItem, ListItemText, Toolbar, AppBar, IconButton as MuiIconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

// Custom Menu Icon component
const CustomMenuIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',  // Align lines to the left
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
        width: 250, 
        height: '100%', 
        bgcolor: '#fff', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}
    >
      <Box sx={{ padding: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h6">Financial Planner</Typography>
        <Avatar alt={user.name} src={user.avatar} sx={{ width: 100, height: 100, marginTop: 4, marginBottom: 4 }} />
        <Typography variant="h6">{user.name}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#ccc",  
            borderRadius: 4, 
            backgroundColor: "#f5f5f5", 
            paddingLeft: 1,
            paddingRight: 2 
          }}
        >
          <IconButton sx={{ fontSize: 'small' }}>
            <AccountBalanceWalletIcon sx={{ fontSize: 'small' }} />
          </IconButton>
          <Typography sx={{ fontSize: 'small' }} variant="body1">${user.balance.toLocaleString()}</Typography>
        </Box>
      </Box>

      <Divider sx={{ width: '100%', marginTop: 2, marginBottom: 2 }} />

      <List sx={{ width: '100%' }}>
        <ListItem button onClick={() => handleNavigation('dashboard')} selected={activeButton === 'dashboard'}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('transactions')} selected={activeButton === 'transactions'}>
          <ListItemText primary="Transactions" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('about')} selected={activeButton === 'about'}>
          <ListItemText primary="About" />
        </ListItem>
      </List>

      <Divider sx={{ width: '100%', marginTop: 2, marginBottom: 2 }} />

      <List sx={{ width: '100%', marginTop: 'auto' }}>
        <ListItem button>
          <ListItemText primary="Sign Out" />
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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        sx={{ 
          width: { md: 250 }, 
          flexShrink: { md: 0 }, 
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          height: '100vh',
          bgcolor: '#fff',
        }}
      >
        {drawer}
      </Box>
    </>
  );
};

export default Sidebar;
