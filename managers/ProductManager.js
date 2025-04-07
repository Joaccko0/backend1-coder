const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
      this.path = path;
    }

    // Lee el archivo
    async #readFile() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    // Escribe al archivo
    async #writeFile(data) {
        await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    }

      // Genera un nuevo ID
    async #generateId(products) {
        const ids = products.map(p => p.id);
        return ids.length > 0 ? Math.max(...ids) + 1 : 1;
    }

    async addProduct(productData) {
        const products = await this.#readFile();
        
        // Evalúa si ya existe un producto con ese ID
        const exists = products.some(p => p.code === productData.code);
        if (exists) throw new Error('Ya existe un producto con ese código');
        
        const newProduct = {
          id: await this.#generateId(products),
          ...productData,
        };
    
        products.push(newProduct);
        await this.#writeFile(products);
    
        return newProduct;
    }

    async getProducts() {
        return await this.#readFile();
    }

    async getProductById(id) {
        const products = await this.#readFile();
        return products.find(p => p.id == id); // comparás con `==` porque el id puede ser string o number
    }

    async updateProduct(id, updatedFields) {
        const products = await this.#readFile();
        const index = products.findIndex(p => p.id == id);
        if (index === -1) throw new Error('Producto no encontrado');
    
        const updatedProduct = {
          ...products[index],
          ...updatedFields,
        };
    
        delete updatedProduct.id; // evitar que se sobreescriba el id
    
        products[index] = { ...products[index], ...updatedFields };
        await this.#writeFile(products);
    
        return products[index];
    }

    async deleteProduct(id) {
        const products = await this.#readFile();
        const filtered = products.filter(p => p.id != id);
    
        if (filtered.length === products.length) {
          throw new Error('Producto no encontrado');
        }
    
        await this.#writeFile(filtered);
        return true;
    }

}

module.exports = ProductManager;