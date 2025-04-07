const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');
const cartManager = new CartManager();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener productos de un carrito
router.get('/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    res.json(cart.products);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Agregar producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    res.json(cart);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
