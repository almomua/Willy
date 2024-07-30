import React, { useState } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const Orders = () => {
  // Placeholder data
  const orders = [
    {
      orderId: '#6709',
      customerId: 'C123',
      shippingMethod: 'Air',
      address: '123 Main St',
      orderItems: ['Item 1', 'Item 2', 'Item 3'],
      totalAmount: '$150.00',
      date: '08/11/2021',
      status: 'Pending',
      paymentMethod: 'Credit Card'
    },
    // Add more orders here...
  ];

  // State to manage selected items for each order
  const [selectedItems, setSelectedItems] = useState(
    orders.reduce((acc, order) => ({ ...acc, [order.orderId]: [] }), {})
  );

  const handleSelectChange = (orderId, event) => {
    setSelectedItems({ ...selectedItems, [orderId]: event.target.value });
  };

  return (
    <Box sx={{ padding: 2, marginLeft: -4 }}>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search Order ID"
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
        <Box>
          <Button variant="contained" sx={{ marginRight: 1, backgroundColor: '#666666', color: 'white' }}>
            Export to Excel
          </Button>
          <Button variant="contained" sx={{ marginRight: 1, backgroundColor: '#666666', color: 'white' }}>
            Import Orders
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#666666', color: 'white' }}>
            + New Order
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Date</InputLabel>
          <Select>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Today">Today</MenuItem>
            <MenuItem value="This Week">This Week</MenuItem>
            <MenuItem value="This Month">This Month</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Fulfilled">Fulfilled</MenuItem>
            <MenuItem value="Unfulfilled">Unfulfilled</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" sx={{ backgroundColor: '#666666', color: 'white' }}>
          More Filters
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer ID</TableCell>
              <TableCell>Shipping Method</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Order Items</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Method</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.customerId}</TableCell>
                <TableCell>{order.shippingMethod}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>
                  <FormControl variant="outlined" fullWidth>
                    <Select
                      multiple
                      value={selectedItems[order.orderId]}
                      onChange={(event) => handleSelectChange(order.orderId, event)}
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {order.orderItems.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <span style={{ color: order.status === 'Pending' ? 'orange' : order.status === 'Fulfilled' ? 'green' : 'red' }}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Orders;
