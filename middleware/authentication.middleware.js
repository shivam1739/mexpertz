const jwt = require('jsonwebtoken');

const isAuthenticatedMiddleware = async (req, res, next) => {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied' });
      }
      try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded) {
                  req.user = decoded;
                  next();
            }
      } catch (error) {
            logger.error('Authenticated Middleware Error:', error.message);
            res.status(401).json({ message: 'Invalid token.' });
      }

}

module.exports = isAuthenticatedMiddleware