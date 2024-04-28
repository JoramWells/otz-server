const cache = require('memory-cache');

const cacheMiddleware = (duration) => (req, res, next) => {
  const key = `__express__${req.originalUrl || req.url}`;
  const cacheBody = cache.get(key);

  if (cacheBody) {
    res.send(cacheBody);
    return;
  }

  const originalSend = res.send.bind(res);
  res.send = (body) => {
    cache.put(key, body, duration * 1000);
    originalSend(body);
  };
  next();
};

module.exports = cacheMiddleware;
