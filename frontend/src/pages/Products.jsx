import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Swal from 'sweetalert2';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/api';

const initialProducts = [
  {
    id: 1,
    name: 'Fan',
    price: 2000,
    category: 'Electronics',
    date: 'Sat Dec 17 2022 14:55:08 GMT+0530 (India Standard Time)',
  },
  {
    id: 2,
    name: 'New HP Laptop',
    price: 30000,
    category: 'Electronics',
    date: 'Fri Dec 16 2022 10:24:47 GMT+0530 (India Standard Time)',
  },
  {
    id: 3,
    name: 'One Plus Advance',
    price: 80000,
    category: 'Mobile',
    date: 'Fri Dec 16 2022 10:23:52 GMT+0530 (India Standard Time)',
  },
  {
    id: 4,
    name: 'Lenevo 2022 Model',
    price: 99999,
    category: 'Laptop',
    date: 'Thu Dec 15 2022 21:13:26 GMT+0530 (India Standard Time)',
  },
  {
    id: 5,
    name: 'Samsung LED TV',
    price: 90000,
    category: 'Electronics',
    date: 'Thu Dec 15 2022 21:53:51 GMT+0530 (India Standard Time)',
  },
  {
    id: 6,
    name: 'Dummy',
    price: 15000,
    category: 'Electronics',
    date: 'Wed Dec 14 2022 18:30:00 GMT+0530 (India Standard Time)',
  },
];

const categories = ['All', 'Electronics', 'Mobile', 'Laptop', 'Fashion', 'Home Appliances'];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const saved = await addProduct(newProduct);
      setProducts((prev) => [saved, ...prev]);
    } catch (err) {
      Swal.fire('Error', err.message || 'Could not save product', 'error');
    }
  };

  const handleSaveProduct = async (updatedProduct) => {
    try {
      const saved = await updateProduct(updatedProduct.id, updatedProduct);
      setProducts((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
    } catch (err) {
      Swal.fire('Error', err.message || 'Could not update product', 'error');
    }
  };

  const handleDeleteClick = (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      focusCancel: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(productId);
          setProducts((prev) => prev.filter((p) => p.id !== productId));
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        } catch (err) {
          Swal.fire('Error', err.message || 'Failed to delete product', 'error');
        }
      }
    });
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setOpenEditModal(true);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter products based on search value and category selection
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !searchValue ||
      (typeof searchValue === 'string'
        ? p.name.toLowerCase().includes(searchValue.toLowerCase())
        : p.name === searchValue.name);
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products dynamically
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (orderBy === 'price') {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    }
    return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  const displayedProducts = sortedProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: 1 }}>
      <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
              Products List
            </Typography>
            <Chip
              label={`${products.length} Items`}
              color="primary"
              variant="outlined"
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Stack>

          <Button
            variant="contained"
            color="primary"
            endIcon={<AddCircleIcon />}
            onClick={() => setOpenAddModal(true)}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'uppercase',
              fontWeight: 700,
              boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)',
            }}
          >
            ADD
          </Button>
        </Box>

        {/* Action Controls Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
          }}
        >
          <Autocomplete
            freeSolo
            options={products.map((option) => option.name)}
            value={searchValue}
            onChange={(event, newValue) => setSearchValue(newValue)}
            sx={{ width: 280 }}
            renderInput={(params) => (
              <TextField {...params} label="Search Products" size="small" variant="outlined" />
            )}
          />

          <TextField
            select
            label="Category"
            size="small"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{ width: 180 }}
            slotProps={{
              input: {
                startAdornment: <FilterAltIcon sx={{ color: '#666', mr: 0.5, fontSize: 18 }} />,
              },
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          {(searchValue || selectedCategory !== 'All') && (
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                setSearchValue(null);
                setSelectedCategory('All');
              }}
              size="small"
            >
              Reset Filters
            </Button>
          )}
        </Box>

        {/* Products Table */}
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#fafafa' }}>
                <TableCell sx={{ fontWeight: 700, color: '#444' }}>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#444' }}>
                  <TableSortLabel
                    active={orderBy === 'price'}
                    direction={orderBy === 'price' ? order : 'asc'}
                    onClick={() => handleSort('price')}
                  >
                    Price (₹)
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#444' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#444' }}>Date</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: '#444' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedProducts.map((row) => (
                <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                    {row.name}
                  </TableCell>
                  <TableCell>₹{row.price}</TableCell>
                  <TableCell>
                    <Chip label={row.category} size="small" variant="outlined" color="default" />
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.85rem', color: '#555' }}>{row.date}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(row)}
                      sx={{ color: '#1976d2', mr: 1 }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(row.id)}
                      sx={{ color: '#d32f2f' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {displayedProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">No matching products found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ mt: 2 }}
        />
      </Card>

      {/* Add Product Dialog Modal */}
      <AddProductModal
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        handleAddProduct={handleAddProduct}
      />

      {/* Edit Product Dialog Modal */}
      <EditProductModal
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
        product={editingProduct}
        handleSaveProduct={handleSaveProduct}
      />
    </Box>
  );
};

export default Products;
