const express = require('express');
const router = express.Router();
const path = require('path');

const ProductManager = require('../managers/ProductManager');
const productManager = new ProductManager(path.resolve(__dirname, '../data/products.json'));

// GET / - Listar todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// GET /:pid - Traer un producto por ID
router.get('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    try {
        const product = await productManager.getProductById(pid);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Error al buscar el producto' });
    }
});


// POST / - Agregar un nuevo producto
router.post('/', async (req, res) => {
    const { title, description, price, thumbnail, code, stock, category, status } = req.body;

    if (!title || !description || !price || !code || !stock || !category) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    if (isNaN(price)) return res.status(400).json({ error: 'Precio inválido' });
    if (isNaN(stock)) return res.status(400).json({ error: 'Stock inválido' });

    const newProduct = {
        title,
        description,
        price,
        thumbnail: thumbnail || [],
        code,
        category,
        status,
        stock
    };

    try {
        const addedProduct = await productManager.addProduct(newProduct);
        req.app.get('io').emit('new-product', addedProduct);
        res.status(201).json(addedProduct);
    } catch (err) {
        res.status(500).json({ error: 'Error al agregar producto' });
    }
});


// PUT /:pid - Actualizar un producto (excepto id)
router.put('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const updatedFields = req.body;

    if (updatedFields.id) {
        return res.status(400).json({ error: 'No se puede modificar el ID' });
    }

    try {
        const updatedProduct = await productManager.updateProduct(pid, updatedFields);
        if (!updatedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
});


// DELETE /:pid - Eliminar un producto
router.delete('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);

    try {
        const deleted = await productManager.deleteProduct(pid);
        req.app.get('io').emit('delete-product', pid);
        if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
});

module.exports = router;