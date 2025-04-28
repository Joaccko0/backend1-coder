// routes/views.js
const express = require('express');
const router = express.Router();
const path = require('path');
const ProductManager = require('../managers/ProductManager');

// Instanciamos para usar la misma fuente de datos JSON
const productManager = new ProductManager(
  path.resolve(__dirname, '../data/products.json')
);

// Ruta Home: listado estático
router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products });
});

// Ruta Real Time Products: listado inicial + WebSocket
router.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
});

module.exports = router;
