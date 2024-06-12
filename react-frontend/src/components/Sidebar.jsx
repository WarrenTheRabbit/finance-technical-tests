import React from 'react';
import { Avatar, Box, Divider, ButtonBase, IconButton, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Sidebar = ({ user, onButtonClick, activeButton }) => (
  <Box sx={{ width: 250, height: '100vh', bgcolor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        <Typography  sx={{ fontSize: 'small' }} variant="body1">${user.balance.toLocaleString()}</Typography>
      </Box>
    </Box>

    <Divider sx={{ width: '100%', marginTop: 2, marginBottom: 2 }} />

    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <ButtonBase onClick={() => onButtonClick('dashboard')} style={{ margin: "24px 10px 24px 10px", padding: "4px 0 4px 0", backgroundColor: activeButton === 'dashboard' ? '#ccc' : 'transparent', borderRadius: "24px" }}>
        <Typography variant="body1" style={{ color: activeButton === 'dashboard' ? '#fff' : '#000' }}>Dashboard</Typography>
      </ButtonBase>
      <ButtonBase onClick={() => onButtonClick('transactions')} style={{ margin: "24px 10px 24px 10px", padding: "4px 0 4px 0", backgroundColor: activeButton === 'transactions' ? '#ccc' : 'transparent', borderRadius: "24px" }}>
        <Typography variant="body1" style={{ color: activeButton === 'transactions' ? '#fff' : '#000' }}>Transactions</Typography>
      </ButtonBase>
      <ButtonBase onClick={() => onButtonClick('about')} style={{ margin: "24px 10px 24px 10px", padding: "4px 0 4px 0", backgroundColor: activeButton === 'about' ? '#ccc' : 'transparent', borderRadius: "24px" }}>
        <Typography variant="body1" style={{ color: activeButton === 'about' ? '#fff' : '#000' }}>About</Typography>
      </ButtonBase>
    </Box>

    <Divider sx={{ width: '100%', marginTop: 2, marginBottom: 2 }} />

    <Box sx={{  display: 'flex', flexDirection: 'column', width: '100%', marginTop: 'auto', padding: 2 }}>
      <ButtonBase style={{ margin: "24px 10px 24px 10px", padding: "4px 0 4px 0", backgroundColor: 'transparent', borderRadius: "24px" }}>
        <Typography variant="body1">Sign Out</Typography>
      </ButtonBase>
    </Box>
  </Box>
);
export default Sidebar;
