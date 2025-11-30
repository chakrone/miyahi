const userRepository = require('../repositories/user.repo');
const jwt = require('../utils/jwt');

class AuthService {
  async register(data) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) throw new Error('Email already in use');

    const user = await userRepository.create(data);
    const token = jwt.sign({ id: user._id, role: user.role });

    return { user, token };
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid email or password');

    const token = jwt.sign({ id: user._id, role: user.role });

    return { user, token };
  }
}

module.exports = new AuthService();
