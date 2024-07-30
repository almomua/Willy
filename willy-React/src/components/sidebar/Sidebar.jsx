// src/components/sidebar/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, Category as CategoryIcon, LocalMall as LocalMallIcon, AttachMoney as AttachMoneyIcon } from '@mui/icons-material'; // Import the discount icon
import { Link } from 'react-router-dom';
import "./Sidebar.css";

const drawerWidth = 240;
const collapsedWidth = 60;

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
      className={isSidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}
      sx={{
        width: isSidebarOpen ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isSidebarOpen ? drawerWidth : collapsedWidth,
          overflowX: 'hidden',
          transition: 'width 0.3s',
          backgroundColor: '#666666',
        },
        [`& .MuiListItemIcon-root`]: {
          color: 'red', // Icon color
        },
        [`& .MuiListItemText-primary`]: {
          color: 'white', // Text color
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button key="Orders" component={Link} to="/orders">
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button key="Categories" component={Link} to="/categories">
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
          <ListItem button key="Products" component={Link} to="/products">
            <ListItemIcon>
              <LocalMallIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button key="Offers" component={Link} to="/offers">
            <ListItemIcon>
              <AttachMoneyIcon /> {/* Use the discount icon here */}
            </ListItemIcon>
            <ListItemText primary="Offers" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
