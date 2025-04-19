import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

const initialExpenses = [
  { id: 1, date: '2025-04-10', category: 'Travel', amount: 120, desc: 'Taxi to airport' },
  { id: 2, date: '2025-04-12', category: 'Meals', amount: 45, desc: 'Lunch with client' },
  { id: 3, date: '2025-04-15', category: 'Supplies', amount: 60, desc: 'Stationery' },
];

const ManageExpenses = () => {
  const [expenses, setExpenses] = useState(initialExpenses);

  const handleDelete = (id) => setExpenses(expenses.filter(e => e.id !== id));

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 700, mx: 'auto', mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>My Expenses</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map(e => (
            <TableRow key={e.id}>
              <TableCell>{dayjs(e.date).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{e.category}</TableCell>
              <TableCell>₹{e.amount}</TableCell>
              <TableCell>{e.desc}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(e.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageExpenses;
