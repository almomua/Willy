
// src/components/category/Category.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import './category.css'; // Import CSS if using custom styles

const initialCategories = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
  { id: 3, name: 'Category 3' },
];

const Category = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  // Function to get the next ID
  const getNextId = () => {
    return categories.length ? Math.max(...categories.map(cat => cat.id)) + 1 : 1;
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === '') return;

    setCategories([...categories, { id: getNextId(), name: newCategory }]);
    setNewCategory('');
  };

  const handleEditCategory = (id, name) => {
    setEditCategoryId(id);
    setEditCategoryName(name);
    setDialogOpen(true);
  };

  const handleUpdateCategory = () => {
    setCategories(categories.map(cat => cat.id === editCategoryId ? { ...cat, name: editCategoryName } : cat));
    setDialogOpen(false);
    setEditCategoryId(null);
  };

  const handleDeleteCategory = (id) => {
    const filteredCategories = categories.filter(cat => cat.id !== id);
    // Reassign IDs to fill the gap
    const reorderedCategories = filteredCategories.map((cat, index) => ({
      ...cat,
      id: index + 1,
    }));
    setCategories(reorderedCategories);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          sx={{ marginRight: 1 }}
        />
        <Button
          onClick={handleAddCategory}
          variant="contained"
          className="add-button" // Apply custom class if using CSS
        >
          Add Category
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map(category => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditCategory(category.id, category.name)} edge="end">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCategory(category.id)} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateCategory} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Category;
