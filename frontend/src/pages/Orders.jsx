import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import Grid from '@mui/material/Grid';
import { getOrders } from '../services/api';

const initialOrders = [
  { id: 'ORD-7089', customer: 'Aarav Sharma', items: 3, total: 4500, status: 'Completed', date: '2026-08-10', payment: 'UPI' },
  { id: 'ORD-7090', customer: 'Priya Verma', items: 1, total: 30000, status: 'Processing', date: '2026-08-11', payment: 'Credit Card' },
  { id: 'ORD-7091', customer: 'Rohan Mehta', items: 2, total: 82000, status: 'Shipped', date: '2026-08-09', payment: 'Net Banking' },
  { id: 'ORD-7092', customer: 'Sneha Patel', items: 4, total: 9500, status: 'Cancelled', date: '2026-08-08', payment: 'Debit Card' },
  { id: 'ORD-7093', customer: 'Vikram Singh', items: 1, total: 90000, status: 'Completed', date: '2026-08-07', payment: 'UPI' },
  { id: 'ORD-7094', customer: 'Ananya Gupta', items: 2, total: 15000, status: 'Processing', date: '2026-08-06', payment: 'Credit Card' },
  { id: 'ORD-7095', customer: 'Karan Malhotra', items: 5, total: 125000, status: 'Shipped', date: '2026-08-05', payment: 'Net Banking' },
];

const statuses = ['All', 'Completed', 'Processing', 'Shipped', 'Cancelled'];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getOrders()
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = statusFilter === 'All' || ord.status === statusFilter;
    const matchesSearch =
      ord.id.toLowerCase().includes(search.toLowerCase()) ||
      ord.customer.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusChip = (status) => {
    switch (status) {
      case 'Completed':
        return <Chip icon={<CheckCircleIcon fontSize="small" />} label={status} color="success" size="small" variant="outlined" sx={{ fontWeight: 600 }} />;
      case 'Processing':
        return <Chip icon={<HourglassTopIcon fontSize="small" />} label={status} color="warning" size="small" variant="outlined" sx={{ fontWeight: 600 }} />;
      case 'Shipped':
        return <Chip icon={<LocalShippingIcon fontSize="small" />} label={status} color="primary" size="small" variant="outlined" sx={{ fontWeight: 600 }} />;
      case 'Cancelled':
        return <Chip icon={<CancelIcon fontSize="small" />} label={status} color="error" size="small" variant="outlined" sx={{ fontWeight: 600 }} />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
  const totalCompleted = orders.filter((o) => o.status === 'Completed').length;
  const totalShipped = orders.filter((o) => o.status === 'Shipped').length;
  const totalPending = orders.filter((o) => o.status === 'Processing').length;

  return (
    <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Top Stat Overview Cards */}
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ p: 2.5, borderRadius: 2, background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', color: '#fff' }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Revenue</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>₹{totalRevenue.toLocaleString()}</Typography>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ p: 2.5, borderRadius: 2, background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', color: '#fff' }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>Completed Orders</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>{totalCompleted}</Typography>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ p: 2.5, borderRadius: 2, background: 'linear-gradient(135deg, #ff8008 0%, #ffc837 100%)', color: '#fff' }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>Pending / Processing</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>{totalPending}</Typography>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ p: 2.5, borderRadius: 2, background: 'linear-gradient(135deg, #4568dc 0%, #b06ab3 100%)', color: '#fff' }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>In Transit (Shipped)</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>{totalShipped}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Main Table Card */}
      <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <ReceiptLongIcon sx={{ color: '#1976d2', fontSize: 28 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Orders Directory
            </Typography>
            <Chip label={`${orders.length} Total`} color="primary" variant="outlined" size="small" />
          </Stack>
        </Box>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            label="Search Order ID or Customer"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 280 }}
          />

          <TextField
            select
            label="Status"
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ width: 180 }}
            slotProps={{
              input: {
                startAdornment: <FilterAltIcon sx={{ color: '#666', mr: 0.5, fontSize: 18 }} />,
              },
            }}
          >
            {statuses.map((st) => (
              <MenuItem key={st} value={st}>
                {st}
              </MenuItem>
            ))}
          </TextField>

          {(search || statusFilter !== 'All') && (
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                setSearch('');
                setStatusFilter('All');
              }}
              size="small"
            >
              Clear Filters
            </Button>
          )}
        </Box>

        {/* Table */}
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'action.hover' }}>
                <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Customer Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Items</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Total Amount</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Payment Method</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>{row.id}</TableCell>
                    <TableCell>{row.customer}</TableCell>
                    <TableCell>{row.items} items</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>₹{row.total.toLocaleString()}</TableCell>
                    <TableCell>{row.payment}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{getStatusChip(row.status)}</TableCell>
                  </TableRow>
                ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">No matching orders found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          sx={{ mt: 2 }}
        />
      </Card>
    </Box>
  );
};

export default Orders;
