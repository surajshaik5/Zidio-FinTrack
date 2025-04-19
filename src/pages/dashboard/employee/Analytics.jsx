import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { category: 'Travel', amount: 300 },
  { category: 'Meals', amount: 180 },
  { category: 'Supplies', amount: 120 },
  { category: 'Other', amount: 60 },
];

const Analytics = () => (
  <Box maxWidth={700} mx="auto" mt={3} display="flex" flexDirection="column" alignItems="center" width="100%">
    <Paper sx={{ p: 3, mb: 3, width: '100%' }}>
      <Typography variant="h6">Expense Analytics (Mock Data)</Typography>
      <Typography>Total Spent: ₹660</Typography>
    </Paper>
    <Paper sx={{ p: 3, width: '100%' }}>
      <Typography variant="subtitle1" gutterBottom>Expenses by Category</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  </Box>
);

export default Analytics;
