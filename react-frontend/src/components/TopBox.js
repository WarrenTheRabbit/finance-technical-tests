import React from 'react';
import { Box, Typography } from '@mui/material';

const TopBox = ({ title, value, description, icon }) => {
  return (
    <Box sx={{ padding: '20px', bgcolor: "#fff", borderRadius: "16px", textAlign: 'center', boxShadow: 1 }}>
      <Typography variant="h4" gutterBottom>{icon}</Typography>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Typography variant="h4" color="primary">{value}</Typography>
      <Typography variant="body2" color="textSecondary">{description}</Typography>
    </Box>
  );
};

export default TopBox;