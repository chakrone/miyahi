const jwt = require('../utils/jwt');
const userRepository = require('../repositories/user.repo');

async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token provided' });

  const token = header.split(' ')[1];
  const decoded = jwt.verify(token);

  if (!decoded)
    return res.status(401).json({ message: 'Invalid or expired token' });

  const user = await userRepository.findById(decoded.id);
  if (!user)
    return res.status(401).json({ message: 'User no longer exists' });

  req.user = user;
  next();
}

module.exports = authMiddleware;
