const BaseRepository = require('./base.repo');
const User = require('../models/user');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return this.model.findOne({ email }).select('+password');
  }

  async findActiveUsers() {
    return this.model.find({ isActive: true });
  }
}

module.exports = new UserRepository();
