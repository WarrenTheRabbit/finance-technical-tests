import React from 'react';
import { Table, TableContainer, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const COLORS = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'];

const ExpenseTable = ({ data }) => (
  <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
    <Table className="table">
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index} style={{ borderBottom: 'none' }}>
            <TableCell style={{ display: "flex", alignItems: "center", borderBottom: 'none'}}>
              <div style={{ height: "24px", width: "24px", borderRadius: "50%", backgroundColor: COLORS[index % COLORS.length], marginRight: "4px" }}></div>
              {row.category}
            </TableCell>
            <TableCell style={{ borderBottom: 'none' }}>${row.amount.toLocaleString()}</TableCell>
            <TableCell style={{ borderBottom: 'none' }}>{row.percentage.toFixed(0)}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ExpenseTable;
