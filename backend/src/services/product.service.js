const productRepository = require('../repositories/product.repo');

class ProductService {
  async createProduct(data) {
    return productRepository.create(data);
  }

  async getProduct(id) {
    return productRepository.findById(id);
  }

  async getProducts(filter = {}) {
    return productRepository.findAll(filter);
  }

  async searchProducts(query) {
    return productRepository.searchByText(query);
  }

  async updateProduct(id, data) {
    return productRepository.updateById(id, data);
  }

  async deleteProduct(id) {
    return productRepository.deleteById(id);
  }
}

module.exports = new ProductService();
