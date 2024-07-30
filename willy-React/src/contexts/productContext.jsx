// src/contexts/ProductContext.js
import React, { createContext, useContext, useState } from 'react';

// Create context
const ProductContext = createContext();

// Create a provider component
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      image: 'https://via.placeholder.com/150',
      cost: 100,
      category: 'Category 1',
    },
    // Add more products as needed
  ]);

  const handleUpdate = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleDelete = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const handleAdd = (newProduct) => {
    newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <ProductContext.Provider value={{ products, handleUpdate, handleDelete, handleAdd }}>
      {children}
    </ProductContext.Provider>
  );
};

// Create a custom hook to use the ProductContext
const useProducts = () => {
  return useContext(ProductContext);
};

export { ProductProvider, useProducts };
