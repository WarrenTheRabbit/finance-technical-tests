import React from 'react';
import { Table, TableContainer, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const COLORS = ['#6760f1', '#e39de0', '#ffe7ed', '#f9c818'];

const ExpenseTable = ({ data }) => (
  <TableContainer component={Paper} sx={{ boxShadow: 'none', maxWidth: '100%' }}>
    <Table size="small" sx={{ '& .MuiTableCell-root': { padding: '4px 8px', margin: '0 4px', fontFamily: 'Inria Sans' } }}>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index} sx={{ borderBottom: 'none' }}>
            <TableCell sx={{ display: "flex", alignItems: "center", borderBottom: 'none', padding: '4px 8px', margin: '0 4px', fontFamily: 'Inria Sans' }}>
              <div style={{ height: "24px", width: "24px", borderRadius: "50%", backgroundColor: COLORS[index % COLORS.length], marginRight: "4px" }}></div>
              {row.category}
            </TableCell>
            <TableCell sx={{ borderBottom: 'none', padding: '4px 8px', margin: '0 4px', fontFamily: 'Inria Sans' }}>${row.amount.toLocaleString()}</TableCell>
            <TableCell sx={{ borderBottom: 'none', padding: '4px 8px', margin: '0 4px', fontFamily: 'Inria Sans' }}>{row.percentage.toFixed(0)}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ExpenseTable;
