const userRepository = require('../repositories/user.repo');

class UserService {
  async getUser(id) {
    return userRepository.findById(id);
  }

  async getAllUsers() {
    return userRepository.findActiveUsers();
  }

  async updateUser(id, data) {
    return userRepository.updateById(id, data);
  }

  async deleteUser(id) {
    return userRepository.deleteById(id);
  }
}

module.exports = new UserService();
