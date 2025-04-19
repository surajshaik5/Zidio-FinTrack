import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Tooltip,
  Chip,
  Grid,
  Card,
  Stack,
  TextField,
  InputAdornment,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import dayjs from 'dayjs';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import useAuth from '../../../hooks/useAuth';
import DashboardLayout from '../../../components/DashboardLayout';
import DashboardCard from '../../../components/DashboardCard';

// Mock data with invoice files
const initialExpenses = [
  { 
    id: 1, 
    employee: 'Alice Johnson',
    employeeAvatar: null, 
    date: '2025-04-12', 
    category: 'Travel', 
    amount: 15000, 
    desc: 'Flight to Delhi for client meeting',
    status: 'pending',
    invoice: {
      name: 'flight_receipt.pdf',
      type: 'application/pdf',
      url: 'https://example.com/mock-invoice.pdf' // In a real app, this would be an actual URL
    }
  },
  { 
    id: 2, 
    employee: 'Bob Smith',
    employeeAvatar: null, 
    date: '2025-04-13', 
    category: 'Meals', 
    amount: 4000, 
    desc: 'Team lunch with marketing department',
    status: 'pending',
    invoice: {
      name: 'lunch_receipt.jpg',
      type: 'image/jpeg',
      url: 'https://example.com/mock-image.jpg' // In a real app, this would be an actual URL
    }
  },
  { 
    id: 3, 
    employee: 'Charlie Davis',
    employeeAvatar: null, 
    date: '2025-04-14', 
    category: 'Supplies', 
    amount: 7500, 
    desc: 'Printer ink and office supplies for Q2',
    status: 'pending',
    invoice: null // Some expenses might not have an invoice
  },
  { 
    id: 4, 
    employee: 'Diana Williams',
    employeeAvatar: null, 
    date: '2025-04-10', 
    category: 'Software', 
    amount: 12000, 
    desc: 'Figma subscription for design team',
    status: 'approved',
    invoice: {
      name: 'figma_invoice.pdf',
      type: 'application/pdf',
      url: 'https://example.com/mock-invoice.pdf'
    }
  },
  { 
    id: 5, 
    employee: 'Edward Jones',
    employeeAvatar: null, 
    date: '2025-04-09', 
    category: 'Travel', 
    amount: 8500, 
    desc: 'Taxi fares for client visits',
    status: 'rejected',
    invoice: {
      name: 'taxi_receipts.jpg',
      type: 'image/jpeg',
      url: 'https://example.com/mock-image.jpg'
    }
  },
];

const ApproveExpenses = () => {
  // Authenticate and require MANAGER role
  useAuth('MANAGER');
  
  const [expenses, setExpenses] = useState(initialExpenses);
  const [filteredExpenses, setFilteredExpenses] = useState(initialExpenses);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenFilterMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectFilter = (filter) => {
    setStatusFilter(filter);
    handleCloseFilterMenu();
    applyFilters(searchQuery, filter);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    applyFilters(query, statusFilter);
  };

  const applyFilters = (query, status) => {
    let filtered = [...initialExpenses];
    
    // Apply status filter
    if (status !== 'all') {
      filtered = filtered.filter(expense => expense.status === status);
    }
    
    // Apply search query
    if (query) {
      const lowercasedQuery = query.toLowerCase();
      filtered = filtered.filter(expense => 
        expense.employee.toLowerCase().includes(lowercasedQuery) ||
        expense.category.toLowerCase().includes(lowercasedQuery) ||
        expense.desc.toLowerCase().includes(lowercasedQuery)
      );
    }
    
    setFilteredExpenses(filtered);
  };

  const handleAction = (id, action) => {
    setExpenses(expenses.map(e => 
      e.id === id ? { ...e, status: action } : e
    ));
    setFilteredExpenses(filteredExpenses.map(e => 
      e.id === id ? { ...e, status: action } : e
    ));
  };

  const handleOpenInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setDialogOpen(true);
  };

  const handleCloseInvoice = () => {
    setDialogOpen(false);
  };

  const getInvoiceIcon = (invoice) => {
    if (!invoice) return <NoPhotographyIcon color="disabled" fontSize="small" />;
    
    if (invoice.type.startsWith('image/')) {
      return <ImageIcon color="primary" fontSize="small" />;
    } else if (invoice.type === 'application/pdf') {
      return <PictureAsPdfIcon color="error" fontSize="small" />;
    }
    
    return <VisibilityIcon color="primary" fontSize="small" />;
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'approved':
        return (
          <Chip 
            icon={<CheckCircleIcon />} 
            label="Approved" 
            color="success" 
            size="small" 
            variant="outlined" 
          />
        );
      case 'rejected':
        return (
          <Chip 
            icon={<CancelIcon />} 
            label="Rejected" 
            color="error" 
            size="small" 
            variant="outlined"
          />
        );
      case 'pending':
      default:
        return (
          <Chip 
            icon={<PendingIcon />} 
            label="Pending" 
            color="warning" 
            size="small" 
            variant="outlined"
          />
        );
    }
  };

  // Count expenses by status
  const pendingCount = initialExpenses.filter(e => e.status === 'pending').length;
  const approvedCount = initialExpenses.filter(e => e.status === 'approved').length;
  const rejectedCount = initialExpenses.filter(e => e.status === 'rejected').length;
  
  // Calculate total amount
  const totalPendingAmount = initialExpenses
    .filter(e => e.status === 'pending')
    .reduce((sum, expense) => sum + expense.amount, 0);

  // Summary cards
  const summaryCards = [
    { 
      title: "Pending Approvals", 
      value: pendingCount.toString(), 
      icon: <PendingIcon fontSize="large" />, 
      color: "warning",
      subtitle: `₹${(totalPendingAmount/1000).toFixed(1)}K Total Amount`,
      onClick: () => handleSelectFilter('pending')
    },
    { 
      title: "Approved This Month", 
      value: approvedCount.toString(), 
      icon: <CheckCircleIcon fontSize="large" />, 
      color: "success",
      subtitle: "In the last 30 days",
      onClick: () => handleSelectFilter('approved')
    },
    { 
      title: "Rejected This Month", 
      value: rejectedCount.toString(), 
      icon: <CancelIcon fontSize="large" />, 
      color: "error",
      subtitle: "In the last 30 days",
      onClick: () => handleSelectFilter('rejected')
    },
    { 
      title: "Average Expense", 
      value: `₹${Math.round(initialExpenses.reduce((sum, e) => sum + e.amount, 0) / initialExpenses.length / 100) / 10}K`, 
      icon: <MonetizationOnIcon fontSize="large" />, 
      color: "info",
      subtitle: "Across all employees"
    },
  ];

  return (
    <DashboardLayout 
      title="Expense Approvals" 
      subtitle="Review and approve expense submissions from your team members"
      breadcrumbs={[
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Approve Expenses', path: '/dashboard/approve-expenses' }
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

      {/* Filters and Search */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        <TextField
          placeholder="Search expenses..."
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          sx={{ minWidth: 250, flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <Box>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleOpenFilterMenu}
            sx={{ height: '100%' }}
          >
            {statusFilter === 'all' ? 'All Statuses' : 
              statusFilter === 'pending' ? 'Pending' : 
              statusFilter === 'approved' ? 'Approved' : 'Rejected'}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseFilterMenu}
          >
            <MenuItem onClick={() => handleSelectFilter('all')}>All Statuses</MenuItem>
            <MenuItem onClick={() => handleSelectFilter('pending')}>Pending</MenuItem>
            <MenuItem onClick={() => handleSelectFilter('approved')}>Approved</MenuItem>
            <MenuItem onClick={() => handleSelectFilter('rejected')}>Rejected</MenuItem>
          </Menu>
        </Box>
      </Paper>

      {/* Expenses Table */}
      <TableContainer 
        component={Paper} 
        elevation={0}
        sx={{ 
          borderRadius: 2, 
          border: '1px solid', 
          borderColor: 'divider',
          overflow: 'hidden'
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: 'background.subtle' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Employee</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Invoice</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((e) => (
                <TableRow key={e.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          width: 30, 
                          height: 30, 
                          mr: 1,
                          bgcolor: e.employeeAvatar ? 'transparent' : `#${Math.floor(Math.random()*16777215).toString(16)}`
                        }}
                        src={e.employeeAvatar}
                      >
                        {e.employee.charAt(0)}
                      </Avatar>
                      <Typography variant="body2">{e.employee}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{dayjs(e.date).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>{e.category}</TableCell>
                  <TableCell>₹{e.amount.toLocaleString()}</TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap' 
                      }}
                    >
                      {e.desc}
                    </Typography>
                  </TableCell>
                  <TableCell>{getStatusChip(e.status)}</TableCell>
                  <TableCell>
                    {e.invoice ? (
                      <Tooltip title="View Invoice">
                        <IconButton 
                          size="small" 
                          onClick={() => handleOpenInvoice(e.invoice)}
                          color="primary"
                        >
                          {getInvoiceIcon(e.invoice)}
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="No Invoice">
                        <span>
                          <IconButton size="small" disabled>
                            <NoPhotographyIcon fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>
                    {e.status === 'pending' ? (
                      <Stack direction="row" spacing={1}>
                        <Button 
                          color="success" 
                          variant="contained" 
                          size="small" 
                          onClick={() => handleAction(e.id, 'approved')}
                          sx={{ minWidth: 'auto', px: 1 }}
                        >
                          <CheckCircleIcon fontSize="small" />
                        </Button>
                        <Button 
                          color="error" 
                          variant="outlined" 
                          size="small" 
                          onClick={() => handleAction(e.id, 'rejected')}
                          sx={{ minWidth: 'auto', px: 1 }}
                        >
                          <CancelIcon fontSize="small" />
                        </Button>
                      </Stack>
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        color={e.status === 'approved' ? 'success' : 'error'}
                        onClick={() => handleAction(e.id, 'pending')}
                      >
                        Reset
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No expenses found matching your filters
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Invoice View Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseInvoice} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {selectedInvoice && getInvoiceIcon(selectedInvoice)}
            <Typography variant="h6" component="div" sx={{ ml: 1 }}>
              {selectedInvoice?.name || 'Invoice'}
            </Typography>
          </Box>
          <IconButton
            aria-label="close"
            onClick={handleCloseInvoice}
            sx={{ color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedInvoice ? (
            selectedInvoice.type.startsWith('image/') ? (
              // For images, show a placeholder or the actual image
              <Box sx={{ textAlign: 'center' }}>
                {/* In a real app, use the actual URL */}
                <Box 
                  component="img" 
                  sx={{ 
                    maxWidth: '100%', 
                    maxHeight: '70vh',
                    objectFit: 'contain',
                    border: '1px solid #eee'
                  }}
                  alt="Invoice" 
                  src="https://via.placeholder.com/800x600.png?text=Receipt+Image+Placeholder"
                />
              </Box>
            ) : (
              // For PDFs, in a real app you'd embed the PDF
              <Box sx={{ 
                height: '70vh', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#f5f5f5',
                borderRadius: 1,
                p: 3
              }}>
                <PictureAsPdfIcon sx={{ fontSize: 60, color: '#f44336', mb: 2 }} />
                <Typography variant="h6" gutterBottom>PDF Document</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                  This is a PDF document. In a real application, it would be embedded here or opened in a new tab.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => window.open(selectedInvoice.url, '_blank')}
                >
                  View PDF (Simulated)
                </Button>
              </Box>
            )
          ) : (
            <Typography>No invoice available</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInvoice}>Close</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default ApproveExpenses;
