// Configuración del servidor Express

// app.js
const express = require('express');
const { engine } = require('express-handlebars')
const http = require('http');
const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const viewsRouter = require('./routes/views');

app.set('io', io);

app.use(express.json()); // Para poder trabajar con JSON en el body
app.use('/api/products', require('./routes/products'));
app.use('/api/carts',   require('./routes/carts'));
app.use('/', viewsRouter);

// Escuchar conexiones de cliente
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
});

// Arrancar servidor en el mismo puerto
server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

module.exports = { server, io };