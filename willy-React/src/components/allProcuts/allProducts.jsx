// src/components/allProducts/allProducts.jsx
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography,
} from '@mui/material';
import { Edit, Delete, Save, Add } from '@mui/icons-material';
import { useProducts } from '../../contexts/productContext';
import { Box } from '@mui/system';

const AllProducts = () => {
  const { products, handleUpdate, handleDelete, handleAdd } = useProducts();
  const [editingProductId, setEditingProductId] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    description: '',
    image: null,
    cost: '',
    category: '',
  });
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    image: null,
    cost: '',
    category: '',
  });

  const startEditing = (product) => {
    setEditingProductId(product.id);
    setUpdatedProduct(product);
  };

  const saveUpdate = () => {
    handleUpdate(updatedProduct);
    setEditingProductId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e, isNew = false) => {
    const file = e.target.files[0];
    if (file) {
      if (isNew) {
        setNewProduct((prev) => ({
          ...prev,
          image: URL.createObjectURL(file),
        }));
      } else {
        setUpdatedProduct((prev) => ({
          ...prev,
          image: URL.createObjectURL(file),
        }));
      }
    }
  };

  const addProduct = () => {
    handleAdd(newProduct);
    setNewProduct({
      name: '',
      description: '',
      image: null,
      cost: '',
      category: '',
    });
  };

  const categories = ['Category 1', 'Category 2', 'Category 3']; // Example categories

  return (
    <Box sx={{ marginLeft: '20px' }}>
      <TableContainer component={Paper}>
      <Typography variant="h4" gutterBottom>
        All Products
      </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  {editingProductId === product.id ? (
                    <TextField
                      name="name"
                      value={updatedProduct.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.name
                  )}
                </TableCell>
                <TableCell>
                  {editingProductId === product.id ? (
                    <TextField
                      name="description"
                      value={updatedProduct.description}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.description
                  )}
                </TableCell>
                <TableCell>
                  {editingProductId === product.id ? (
                    <input type="file" onChange={(e) => handleImageChange(e)} />
                  ) : (
                    <img src={product.image} alt={product.name} width="50" />
                  )}
                </TableCell>
                <TableCell>
                  {editingProductId === product.id ? (
                    <TextField
                      name="cost"
                      value={updatedProduct.cost}
                      onChange={handleInputChange}
                      type="number"
                    />
                  ) : (
                    product.cost
                  )}
                </TableCell>
                <TableCell>
                  {editingProductId === product.id ? (
                    <FormControl fullWidth>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        labelId="category-label"
                        name="category"
                        value={updatedProduct.category}
                        onChange={handleInputChange}
                      >
                        {categories.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    product.category
                  )}
                </TableCell>
                <TableCell>
                  {editingProductId === product.id ? (
                    <IconButton onClick={saveUpdate}>
                      <Save />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton onClick={() => startEditing(product)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(product.id)}>
                        <Delete />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={7}>
                <Typography variant="h6" component="div" sx={{ marginTop: 2, marginBottom: 1 }}>
                  Add Product
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <TextField
                  name="name"
                  label="Name"
                  value={newProduct.name}
                  onChange={handleNewInputChange}
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="description"
                  label="Description"
                  value={newProduct.description}
                  onChange={handleNewInputChange}
                />
              </TableCell>
              <TableCell>
                <input type="file" onChange={(e) => handleImageChange(e, true)} />
              </TableCell>
              <TableCell>
                <TextField
                  name="cost"
                  label="Cost"
                  value={newProduct.cost}
                  onChange={handleNewInputChange}
                  type="number"
                />
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel id="new-category-label">Category</InputLabel>
                  <Select
                    labelId="new-category-label"
                    name="category"
                    value={newProduct.category}
                    onChange={handleNewInputChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <IconButton onClick={addProduct}>
                  <Add />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllProducts;
