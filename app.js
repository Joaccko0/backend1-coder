// Configuración del servidor Express

// app.js
const express = require('express');
const { engine } = require('express-handlebars')
const app = express();
const PORT = 3000;

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
const viewsRouter = require('./routes/views');

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
app.set('io', io);

app.use(express.json()); // Para poder trabajar con JSON en el body
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Escuchar conexiones de cliente
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
});

// Arrancar servidor en el mismo puerto
server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

module.exports = { server, io };