class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findById(id, populate = []) {
    return this.model.findById(id).populate(populate);
  }

  async findOne(filter = {}, populate = []) {
    return this.model.findOne(filter).populate(populate);
  }

  async findAll(filter = {}, populate = []) {
    return this.model.find(filter).populate(populate);
  }

  async updateById(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;
