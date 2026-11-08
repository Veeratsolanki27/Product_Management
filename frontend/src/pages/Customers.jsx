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
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';
import { getCustomers } from '../services/api';

const initialCustomers = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav.sharma@example.com', phone: '+91 98765 43210', location: 'Mumbai, India', totalOrders: 12, spent: 145000, status: 'VIP' },
  { id: 2, name: 'Priya Verma', email: 'priya.v@example.com', phone: '+91 98123 45678', location: 'Delhi, India', totalOrders: 5, spent: 42000, status: 'Active' },
  { id: 3, name: 'Rohan Mehta', email: 'rohan.m@example.com', phone: '+91 97111 22334', location: 'Bangalore, India', totalOrders: 8, spent: 98000, status: 'Active' },
  { id: 4, name: 'Sneha Patel', email: 'sneha.patel@example.com', phone: '+91 96555 44332', location: 'Ahmedabad, India', totalOrders: 2, spent: 12000, status: 'New' },
  { id: 5, name: 'Vikram Singh', email: 'vikram.s@example.com', phone: '+91 95444 33221', location: 'Jaipur, India', totalOrders: 15, spent: 210000, status: 'VIP' },
  { id: 6, name: 'Ananya Gupta', email: 'ananya.g@example.com', phone: '+91 94333 22110', location: 'Kolkata, India', totalOrders: 4, spent: 34000, status: 'Active' },
];

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getCustomers()
      .then((data) => setCustomers(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleContactCustomer = (customer) => {
    Swal.fire({
      title: `Contact ${customer.name}`,
      html: `<b>Email:</b> ${customer.email}<br/><b>Phone:</b> ${customer.phone}<br/><b>Location:</b> ${customer.location}`,
      icon: 'info',
      confirmButtonColor: '#1976d2',
    });
  };

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
              ₹{Math.round(customers.reduce((acc, c) => acc + c.spent, 0) / customers.length).toLocaleString()}
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
                <TableCell align="right" sx={{ fontWeight: 700 }}>Action</TableCell>
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
                          {row.name.charAt(0)}
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
                    <TableCell sx={{ fontWeight: 600 }}>{row.totalOrders} orders</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#2e7d32' }}>₹{row.spent.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        color={row.status === 'VIP' ? 'secondary' : row.status === 'Active' ? 'success' : 'default'}
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="outlined" onClick={() => handleContactCustomer(row)}>
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredCustomers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">No matching customers found.</Typography>
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
          sx={{ mt: 2 }}
        />
      </Card>
    </Box>
  );
};

export default Customers;
