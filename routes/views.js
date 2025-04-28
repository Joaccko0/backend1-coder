// routes/views.js
const express = require('express');
const router = express.Router();
const path = require('path');
const ProductManager = require('../managers/ProductManager');
const pm = new ProductManager(path.resolve(__dirname,'../data/products.json'));

// Instanciamos para usar la misma fuente de datos JSON
const productManager = new ProductManager(
  path.resolve(__dirname, '../data/products.json')
);

// Home estático
router.get('/', async (req, res) => {
    const products = await pm.getProducts();
    res.render('home', { products });
});
  
// RealTimeProducts (inicial + WebSocket)
router.get('/realtimeproducts', async (req, res) => {
    const products = await pm.getProducts();
    res.render('realTimeProducts', { products });
});

module.exports = router;
