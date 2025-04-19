import React from 'react';
import { Box, Paper, Typography, Grid, ButtonGroup, Button, Divider, Stack } from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GroupsIcon from '@mui/icons-material/Groups';
import useAuth from '../../../hooks/useAuth';
import DashboardLayout from '../../../components/DashboardLayout';
import DashboardCard from '../../../components/DashboardCard';

// Sample data for departments
const departmentData = [
  { department: 'Engineering', amount: 124500 },
  { department: 'Sales', amount: 89700 },
  { department: 'HR', amount: 34200 },
  { department: 'Marketing', amount: 67800 },
  { department: 'Finance', amount: 45600 },
];

// Sample data for expense categories
const categoryData = [
  { name: 'Travel', value: 145000, fill: '#26A6B5' },
  { name: 'Office Supplies', value: 75000, fill: '#1976d2' },
  { name: 'Software', value: 98000, fill: '#e91e63' },
  { name: 'Meals', value: 35000, fill: '#ff9800' },
  { name: 'Equipment', value: 87800, fill: '#4caf50' },
];

// Sample data for monthly trends
const monthlyData = [
  { month: 'Jan', expenses: 45000, budget: 50000 },
  { month: 'Feb', expenses: 52000, budget: 50000 },
  { month: 'Mar', expenses: 48000, budget: 50000 },
  { month: 'Apr', expenses: 61000, budget: 60000 },
  { month: 'May', expenses: 55000, budget: 60000 },
  { month: 'Jun', expenses: 67000, budget: 60000 },
];

const CompanyOverview = () => {
  // Authenticate with required role 'ADMIN'
  useAuth('ADMIN');
  
  // Calculate total expenses
  const totalExpenses = departmentData.reduce((sum, dept) => sum + dept.amount, 0);
  
  // Summary cards data
  const summaryCards = [
    { 
      title: "Total Expenses", 
      value: `₹${(totalExpenses/1000).toFixed(0)}K`, 
      icon: <AccountBalanceWalletIcon fontSize="large" />, 
      color: "primary",
      subtitle: "Financial year 2025"
    },
    { 
      title: "Departments", 
      value: departmentData.length.toString(), 
      icon: <BusinessIcon fontSize="large" />, 
      color: "success",
      subtitle: "Active expense reporting"
    },
    { 
      title: "Total Employees", 
      value: "138", 
      icon: <GroupsIcon fontSize="large" />, 
      color: "info",
      subtitle: "Across all departments"
    },
    { 
      title: "Monthly Growth", 
      value: "+5.2%", 
      icon: <TrendingUpIcon fontSize="large" />, 
      color: "warning",
      subtitle: "Compared to last month"
    }
  ];
  
  return (
    <DashboardLayout 
      title="Company Overview" 
      subtitle="Financial insights and expense analytics across all departments"
      breadcrumbs={[
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Company Overview', path: '/dashboard/company-overview' }
      ]}
    >
      {/* Summary Cards */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
        {summaryCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <DashboardCard {...card} />
          </Grid>
        ))}
      </Grid>
      
      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Expenses by Department */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              border: '1px solid',
              borderColor: 'divider',
              height: '100%'
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ fontSize: '1rem' }}>
              Expenses by Department
            </Typography>
            <Box height={320}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData} layout="vertical" margin={{ left: 5, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number" 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `₹${value/1000}K`}
                    fontSize={11}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="department" 
                    axisLine={false} 
                    tickLine={false}
                    fontSize={11}
                    width={80}
                  />
                  <RechartsTooltip 
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Total Expenses']}
                    labelFormatter={(label) => `${label} Department`}
                    contentStyle={{ fontSize: '11px' }}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="#26A6B5" 
                    radius={[0, 4, 4, 0]}
                    barSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        {/* Expense Categories */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              border: '1px solid',
              borderColor: 'divider',
              height: '100%'
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ fontSize: '1rem' }}>
              Expense Categories
            </Typography>
            <Box sx={{ 
              height: 'calc(100% - 30px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              {/* Pie Chart at the top */}
              <Box sx={{ width: '100%', height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 10, bottom: 0, left: 10 }}>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']} contentStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              
              {/* Legend below the chart */}
              <Box sx={{ 
                width: '100%', 
                mt: 1,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                {categoryData.map((item, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      mx: 1.5,
                      mb: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: '70px'
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box 
                        sx={{ 
                          width: 10, 
                          height: 10, 
                          borderRadius: '50%', 
                          bgcolor: item.fill 
                        }} 
                      />
                      <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.8rem' }}>
                        {item.name}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                      ₹{(item.value/1000).toFixed(0)}K ({Math.round(item.value/totalExpenses*100)}%)
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        {/* Monthly Trends */}
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ fontSize: '1rem' }}>
              Monthly Expense Trends
            </Typography>
            <Box height={320}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={11} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(value) => `₹${value/1000}K`}
                    fontSize={11}
                    width={40}
                  />
                  <RechartsTooltip 
                    formatter={(value) => [`₹${value.toLocaleString()}`, null]}
                    contentStyle={{ fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#26A6B5" 
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    name="Actual Expenses"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="budget" 
                    stroke="#9e9e9e" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Budget"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default CompanyOverview;
