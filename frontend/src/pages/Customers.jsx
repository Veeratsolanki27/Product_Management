import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PeopleIcon from '@mui/icons-material/People';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';
import { getCustomers, addCustomer, deleteCustomer } from '../services/api';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Add Customer modal state
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('Active');

  const fetchCustomers = () => {
    getCustomers()
      .then((data) => setCustomers(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      const newCustomer = {
        name,
        email,
        phone: phone || '+91 90000 00000',
        location: location || 'India',
        totalOrders: 0,
        spent: 0.0,
        status,
      };
      await addCustomer(newCustomer);
      setOpenModal(false);
      setName('');
      setEmail('');
      setPhone('');
      setLocation('');
      setStatus('Active');
      fetchCustomers();
      Swal.fire({
        title: 'Added!',
        text: 'New customer added successfully.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire('Error', err.message || 'Failed to add customer', 'error');
    }
  };

  const handleDeleteCustomer = (customerId) => {
    Swal.fire({
      title: 'Delete Customer?',
      text: 'Are you sure you want to remove this client from CRM?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCustomer(customerId);
          fetchCustomers();
          Swal.fire('Deleted!', 'Customer removed successfully.', 'success');
        } catch (err) {
          Swal.fire('Error', err.message || 'Failed to delete customer', 'error');
        }
      }
    });
  };

  const filteredCustomers = customers.filter(
    (c) =>
      (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.location || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleContactCustomer = (customer) => {
    Swal.fire({
      title: `Contact ${customer.name}`,
      html: `<b>Email:</b> ${customer.email}<br/><b>Phone:</b> ${customer.phone}<br/><b>Location:</b> ${customer.location}`,
      icon: 'info',
      confirmButtonColor: '#1976d2',
    });
  };

  const totalSpentAll = customers.reduce((acc, c) => acc + (c.spent || 0), 0);
  const avgSpent = customers.length > 0 ? Math.round(totalSpentAll / customers.length) : 0;

  return (
    <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Top Stat Cards */}
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ p: 2.5, borderRadius: 2, background: 'linear-gradient(135deg, #00b4db 0%, #0083b0 100%)', color: '#fff' }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Customers</Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>{customers.length}</Typography>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ p: 2.5, borderRadius: 2, background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', color: '#fff' }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>VIP Members</Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>{customers.filter(c => c.status === 'VIP').length}</Typography>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ p: 2.5, borderRadius: 2, background: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)', color: '#fff' }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>Avg Spent / Customer</Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
              ₹{avgSpent.toLocaleString()}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Main Table Card */}
      <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <PeopleIcon sx={{ color: '#1976d2', fontSize: 28 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Customer CRM Directory
            </Typography>
            <Chip label={`${customers.length} Contacts`} color="primary" variant="outlined" size="small" />
          </Stack>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={() => setOpenModal(true)}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Add Customer
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Search Customer by Name, Email, or City"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 340 }}
          />
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'action.hover' }}>
                <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Contact Info</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Orders</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Total Spent</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: row.status === 'VIP' ? '#9c27b0' : '#1976d2', width: 36, height: 36, fontSize: '0.9rem' }}>
                          {row.name ? row.name.charAt(0) : 'U'}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.name}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{row.email}</Typography>
                      <Typography variant="caption" color="text.secondary">{row.phone}</Typography>
                    </TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{row.totalOrders || 0} orders</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>₹{(row.spent || 0).toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        color={row.status === 'VIP' ? 'secondary' : row.status === 'Active' ? 'success' : 'default'}
                        variant={row.status === 'VIP' ? 'filled' : 'outlined'}
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleContactCustomer(row)}
                          sx={{ textTransform: 'none', py: 0.3 }}
                        >
                          Contact
                        </Button>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteCustomer(row.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredCustomers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                    No customers match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCustomers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Card>

      {/* Add Customer Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Add New Customer</DialogTitle>
        <form onSubmit={handleCreateCustomer}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Customer Name"
              required
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Phone Number"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
            />
            <TextField
              label="Location / City"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Mumbai, India"
            />
            <TextField
              select
              label="Customer Status"
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="VIP">VIP</MenuItem>
              <MenuItem value="New">New</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions sx={{ p: 2.5, pt: 0 }}>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Save Customer</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Customers;
