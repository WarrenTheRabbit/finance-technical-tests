import React, { useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, InputAdornment, Checkbox, Pagination, Button, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const transactionsData = [
  { category: 'Good Life', date: '11/30/2023', amount: 60.00 },
  { category: 'Transport', date: '11/30/2023', amount: 40.00 },
  { category: 'Home', date: '11/30/2023', amount: 10.00 },
  { category: 'Personal', date: '11/30/2023', amount: 30.00 },
  // Add more fake data as needed
];

const CustomTableContainer = styled(TableContainer)({
  boxShadow: 'none',
  borderRadius: '8px',
});

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(transactionsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAll, setSelectedAll] = useState(false);

  const handleSearch = () => {
    const filtered = transactionsData.filter(transaction =>
      Object.values(transaction).some(value =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  const handleSelectAll = (event) => {
    setSelectedAll(event.target.checked);
  };

  const transactionsPerPage = 10;
  const displayedTransactions = filteredTransactions.slice((currentPage - 1) * transactionsPerPage, currentPage * transactionsPerPage);

  return (
    <Box sx={{ padding: '10px 20px', bgcolor: '#f5f5f5', borderRadius: '16px' }}>
      <Typography variant="h5" gutterBottom>All Transactions</Typography>
      <Box sx={{ display: 'flex', marginBottom: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '100%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ marginLeft: 1 }}>
          Search
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 2 }}>
        <Tooltip title="Edit">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Don't show me again">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <CustomTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={displayedTransactions.some(transaction => !transaction.selected) && displayedTransactions.some(transaction => transaction.selected)}
                  checked={selectedAll}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedTransactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <Checkbox checked={selectedAll} />
                </TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination
          count={Math.ceil(filteredTransactions.length / transactionsPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Transactions;