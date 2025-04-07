const ProductManager = require('../managers/ProductManager');

const manager = new ProductManager('./data/products.json');

// Usá async/await para probar los métodos uno por uno
const runTests = async () => {

    // 1. Agregar un producto
    const nuevoProducto = {
        title: 'Zapatilla',
        description: 'Zapatillas Nike color Negra',
        price: 1500,
        thumbnail: 'img/zapatilla-nike.jpg',
        code: 'ZNIKE001',
        stock: 25,
    };

    // 2. Agregar producto
    const resultAdd = await manager.addProduct(nuevoProducto);
    console.log('Producto agregado:', resultAdd);

    // 3. Obtener todos los productos
    const productos = await manager.getProducts();
    console.log('Todos los productos:', productos);

    // 4. Obtener producto por ID
    const prodId = resultAdd.id; // suponemos que addProduct devuelve el producto agregado
    const productoPorId = await manager.getProductById(prodId);
    console.log('Producto por ID:', productoPorId);

    // 5. Actualizar producto
    const actualizado = await manager.updateProduct(prodId, { price: 3900, stock: 30 });
    console.log('Producto actualizado:', actualizado);

    // 6. Eliminar producto
    const eliminado = await manager.deleteProduct(prodId);
    console.log('Producto eliminado:', eliminado);
};

runTests();