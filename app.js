// Configuración del servidor Express

// app.js
const express = require('express');
const app = express();
const PORT = 8080;

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use(express.json()); // Para poder trabajar con JSON en el body
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });

// Cada grupo de rutas (/api/products y /api/carts) va a ser manejado por su propio archivo router, que se 
// encargará de delegar las tareas al manager correspondiente.