const BaseRepository = require('./base.repo');
const Product = require('../models/product');

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  async searchByText(query) {
    return this.model.find({ $text: { $search: query } });
  }

  async findByCategory(category) {
    return this.model.find({ category, isActive: true });
  }
}

module.exports = new ProductRepository();
