import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline, Toolbar, AppBar, Typography } from '@mui/material';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Orders from './components/allOrders/allorders.jsx';
import AllProducts from './components/allProcuts/allProducts.jsx';
import Category from './components/category/category.jsx';
import Offer from './components/Offers/offers.jsx'; 
import { ProductProvider } from './contexts/productContext.jsx';

const drawerWidth = 240;
const collapsedWidth = 60;

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <ProductProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'red' }}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                willy
              </Typography>
            </Toolbar>
          </AppBar>
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              p: 3,
              transition: 'margin-left 0.3s',
              marginLeft: isSidebarOpen ? `${drawerWidth - 20}px` : `${collapsedWidth - 20}px`,
            }}
          >
            <Toolbar />
            <Routes>
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/categories" element={<Category />} />
              <Route path="/offers" element={<Offer />} /> {/* Add route for Offer */}
            </Routes>
          </Box>
        </Box>
      </ProductProvider>
    </Router>
  );
};

export default App;
