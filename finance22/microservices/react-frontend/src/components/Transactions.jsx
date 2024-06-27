import React, { useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, InputAdornment, Checkbox, Pagination, Button, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// It has been disabled temporarily  
const transactionsData = [
  { category: 'Good Life', date: '11/30/2023', amount: 60.00, description: '' },
  { category: 'Transport', date: '11/30/2023', amount: 40.00, description: '' },
  { category: 'Home', date: '11/30/2023', amount: 10.00, description: '' },
  { category: 'Personal', date: '11/30/2023', amount: 30.00, description: '' },
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
  const [selectedRows, setSelectedRows] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [description, setDescription] = useState('');

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
    const checked = event.target.checked;
    setSelectedAll(checked);
    setSelectedRows(checked ? filteredTransactions.map(transaction => transaction) : []);
  };

  const handleSelectRow = (transaction) => {
    const selectedIndex = selectedRows.indexOf(transaction);
    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(selectedRows, transaction);
    } else if (selectedIndex === 0) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRows = newSelectedRows.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1),
      );
    }

    setSelectedRows(newSelectedRows);
  };

  const handleEditClick = () => {
    if (selectedRows.length > 0) {
      setIsDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleSaveDescription = () => {
    setFilteredTransactions(prevState => prevState.map(transaction => {
      if (selectedRows.includes(transaction)) {
        return { ...transaction, description };
      }
      return transaction;
    }));
    setIsDialogOpen(false);
    setSelectedRows([]);
    setSelectedAll(false);
    setDescription('');
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
          <IconButton onClick={handleEditClick}>
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
                  indeterminate={selectedRows.length > 0 && selectedRows.length < displayedTransactions.length}
                  checked={selectedAll}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedTransactions.map((transaction, index) => (
              <TableRow key={index} selected={selectedRows.includes(transaction)}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRows.includes(transaction)}
                    onChange={() => handleSelectRow(transaction)}
                  />
                </TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
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
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Description</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a description for the selected transactions.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveDescription} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Transactions;