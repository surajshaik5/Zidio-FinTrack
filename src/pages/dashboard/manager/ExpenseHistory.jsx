import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';

const history = [
  { id: 1, employee: 'Alice', date: '2025-04-10', category: 'Travel', amount: 120, desc: 'Taxi', status: 'Approved' },
  { id: 2, employee: 'Bob', date: '2025-04-09', category: 'Meals', amount: 30, desc: 'Lunch', status: 'Rejected' },
  { id: 3, employee: 'Charlie', date: '2025-04-08', category: 'Supplies', amount: 50, desc: 'Paper', status: 'Approved' },
];

const ExpenseHistory = () => (
  <TableContainer component={Paper} sx={{ maxWidth: 800, mx: 'auto', mt: 3 }}>
    <Typography variant="h6" sx={{ p: 2 }}>Expense History</Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Employee</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {history.map(e => (
          <TableRow key={e.id}>
            <TableCell>{e.employee}</TableCell>
            <TableCell>{dayjs(e.date).format('DD/MM/YYYY')}</TableCell>
            <TableCell>{e.category}</TableCell>
            <TableCell>₹{e.amount}</TableCell>
            <TableCell>{e.desc}</TableCell>
            <TableCell>{e.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ExpenseHistory;
