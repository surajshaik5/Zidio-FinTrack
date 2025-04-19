import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const employees = [
  { id: 1, name: 'Alice', email: 'alice@email.com', phone: '1234567890', role: 'Employee' },
  { id: 2, name: 'Bob', email: 'bob@email.com', phone: '9876543210', role: 'Employee' },
  { id: 3, name: 'Charlie', email: 'charlie@email.com', phone: '5551234567', role: 'Employee' },
];

const AllEmployees = () => (
  <TableContainer component={Paper} sx={{ maxWidth: 700, mx: 'auto', mt: 3 }}>
    <Typography variant="h6" sx={{ p: 2 }}>All Employees</Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Role</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {employees.map(e => (
          <TableRow key={e.id}>
            <TableCell>{e.name}</TableCell>
            <TableCell>{e.email}</TableCell>
            <TableCell>{e.phone}</TableCell>
            <TableCell>{e.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default AllEmployees;
