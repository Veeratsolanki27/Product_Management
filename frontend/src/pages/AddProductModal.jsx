import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Swal from 'sweetalert2';

const categories = ['Electronics', 'Mobile', 'Laptop', 'Fashion', 'Home Appliances'];

const AddProductModal = ({ open, handleClose, handleAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
      category: category || 'Electronics',
      date: new Date().toString(),
    };
    handleAddProduct(newProduct);
    setName('');
    setPrice('');
    setCategory('');
    handleClose();

    // Trigger SweetAlert2 success dialog matching screenshot
    Swal.fire({
      title: 'Submitted!',
      text: 'Your file has been submitted.',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            p: 3,
            width: '100%',
            maxWidth: 480,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          },
        },
      }}
    >
      <Box sx={{ position: 'relative', pt: 1, pb: 3, textAlign: 'center' }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontSize: '1.75rem',
            fontWeight: 400,
            color: '#222222',
            letterSpacing: '0.2px',
          }}
        >
          Add Product
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: -8,
            top: -8,
            color: '#666666',
          }}
        >
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Box>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 0, overflow: 'visible' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="New Dummy"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5,
                },
              }}
            />

            <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
              <TextField
                label="Price"
                type="number"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ color: '#444', fontSize: '1.2rem', mr: 0.5 }}>
                        ₹
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                  },
                }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.2,
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  borderRadius: 1.5,
                  backgroundColor: '#1976d2',
                  boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)',
                  textTransform: 'uppercase',
                  '&:hover': { backgroundColor: '#1565c0' },
                }}
              >
                SUBMIT
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddProductModal;
