// src/components/offer/Offer.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const initialOffers = [
  { id: 1, productId: 101, discount: 10 },
  { id: 2, productId: 102, discount: 20 },
  { id: 3, productId: 103, discount: 15 },
];

const Offer = () => {
  const [offers, setOffers] = useState(initialOffers);
  const [newProductId, setNewProductId] = useState('');
  const [newDiscount, setNewDiscount] = useState('');
  const [editOfferId, setEditOfferId] = useState(null);
  const [editProductId, setEditProductId] = useState('');
  const [editDiscount, setEditDiscount] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const getNextId = () => {
    return offers.length ? Math.max(...offers.map(offer => offer.id)) + 1 : 1;
  };

  const handleAddOffer = () => {
    if (newProductId.trim() === '' || newDiscount.trim() === '') return;

    setOffers([...offers, { id: getNextId(), productId: Number(newProductId), discount: Number(newDiscount) }]);
    setNewProductId('');
    setNewDiscount('');
  };

  const handleEditOffer = (id, productId, discount) => {
    setEditOfferId(id);
    setEditProductId(productId);
    setEditDiscount(discount);
    setDialogOpen(true);
  };

  const handleUpdateOffer = () => {
    setOffers(offers.map(offer => 
      offer.id === editOfferId ? { ...offer, productId: Number(editProductId), discount: Number(editDiscount) } : offer
    ));
    setDialogOpen(false);
    setEditOfferId(null);
  };

  const handleDeleteOffer = (id) => {
    const filteredOffers = offers.filter(offer => offer.id !== id);
    const reorderedOffers = filteredOffers.map((offer, index) => ({
      ...offer,
      id: index + 1,
    }));
    setOffers(reorderedOffers);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Product ID"
          value={newProductId}
          onChange={(e) => setNewProductId(e.target.value)}
          sx={{ marginRight: 1 }}
        />
        <TextField
          label="Discount (%)"
          value={newDiscount}
          onChange={(e) => setNewDiscount(e.target.value)}
          sx={{ marginRight: 1 }}
        />
        <Button
          onClick={handleAddOffer}
          variant="contained"
          sx={{ backgroundColor: '#666666', marginTop: 1, '&:hover': { backgroundColor: '#555555' } }}
        >
          Add Offer
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product ID</TableCell>
              <TableCell>Discount (%)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map(offer => (
              <TableRow key={offer.id}>
                <TableCell>{offer.id}</TableCell>
                <TableCell>{offer.productId}</TableCell>
                <TableCell>{offer.discount}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditOffer(offer.id, offer.productId, offer.discount)} edge="end">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteOffer(offer.id)} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Edit Offer</DialogTitle>
        <DialogContent>
          <TextField
            label="Product ID"
            value={editProductId}
            onChange={(e) => setEditProductId(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Discount (%)"
            value={editDiscount}
            onChange={(e) => setEditDiscount(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateOffer} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Offer;
