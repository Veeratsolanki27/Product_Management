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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';
import { getOrders, addOrder, deleteOrder } from '../services/api';

const statuses = ['All', 'Completed', 'Processing', 'Shipped', 'Cancelled'];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Add Order Dialog state
  const [openModal, setOpenModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState('1');
  const [total, setTotal] = useState('');
  const [orderStatus, setOrderStatus] = useState('Processing');
  const [payment, setPayment] = useState('UPI');

  const fetchOrders = () => {
    getOrders()
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    if (!customerName || !total) return;

    try {
      const newOrder = {
        customer: customerName,
        items: parseInt(items, 10) || 1,
        total: parseFloat(total),
        status: orderStatus,
        date: new Date().toISOString().split('T')[0],
        payment,
      };
      await addOrder(newOrder);
      setOpenModal(false);
      setCustomerName('');
      setItems('1');
      setTotal('');
      setOrderStatus('Processing');
      setPayment('UPI');
      fetchOrders();
      Swal.fire({
        title: 'Created!',
        text: 'New order has been added successfully.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire('Error', err.message || 'Failed to create order', 'error');
    }
  };

  const handleDeleteOrder = (orderId) => {
    Swal.fire({
      title: 'Delete Order?',
      text: `Are you sure you want to delete order ${orderId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteOrder(orderId);
          fetchOrders();
          Swal.fire('Deleted!', 'Order deleted successfully.', 'success');
        } catch (err) {
          Swal.fire('Error', err.message || 'Failed to delete order', 'error');
        }
      }
    });
  };

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = statusFilter === 'All' || ord.status === statusFilter;
    const matchesSearch =
      (ord.id || '').toLowerCase().includes(search.toLowerCase()) ||
      (ord.customer || '').toLowerCase().includes(search.toLowerCase());
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

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? (o.total || 0) : 0), 0);
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
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>₹{Math.round(totalRevenue).toLocaleString()}</Typography>
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
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={() => setOpenModal(true)}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Create Order
          </Button>
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
            {statuses.map((stat) => (
              <MenuItem key={stat} value={stat}>
                {stat}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'action.hover' }}>
                <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Items</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Amount (₹)</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Payment Method</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {row.id}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{row.customer}</TableCell>
                    <TableCell>{row.items} pcs</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>₹{row.total?.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip label={row.payment} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{getStatusChip(row.status)}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteOrder(row.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                    No orders match your filter criteria.
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
        />
      </Card>

      {/* Create Order Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Add New Order</DialogTitle>
        <form onSubmit={handleCreateOrder}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Customer Name"
              required
              fullWidth
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <TextField
              label="Number of Items"
              type="number"
              required
              fullWidth
              value={items}
              onChange={(e) => setItems(e.target.value)}
            />
            <TextField
              label="Total Price (₹)"
              type="number"
              required
              fullWidth
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
            <TextField
              select
              label="Order Status"
              fullWidth
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </TextField>
            <TextField
              select
              label="Payment Method"
              fullWidth
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            >
              <MenuItem value="UPI">UPI</MenuItem>
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="Debit Card">Debit Card</MenuItem>
              <MenuItem value="Net Banking">Net Banking</MenuItem>
              <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions sx={{ p: 2.5, pt: 0 }}>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Create Order</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Orders;
