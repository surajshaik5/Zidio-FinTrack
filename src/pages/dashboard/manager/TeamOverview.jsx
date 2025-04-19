import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const teamData = [
  { employee: 'Alice', total: 320, pending: 1, approved: 2, rejected: 0 },
  { employee: 'Bob', total: 200, pending: 0, approved: 1, rejected: 1 },
  { employee: 'Charlie', total: 125, pending: 1, approved: 1, rejected: 1 },
];

const TeamOverview = () => (
  <TableContainer component={Paper} sx={{ maxWidth: 700, mx: 'auto', mt: 3 }}>
    <Typography variant="h6" sx={{ p: 2 }}>Team Overview</Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Employee</TableCell>
          <TableCell>Total Expenses</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>Approved</TableCell>
          <TableCell>Rejected</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {teamData.map(e => (
          <TableRow key={e.employee}>
            <TableCell>{e.employee}</TableCell>
            <TableCell>₹{e.total}</TableCell>
            <TableCell>{e.pending}</TableCell>
            <TableCell>{e.approved}</TableCell>
            <TableCell>{e.rejected}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TeamOverview;
