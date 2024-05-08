const express = require('express');
const redis = require('redis');
const { promisify } = require('util');

const app = express();

app.use((req, res, next) => {
  const client = redis.createClient({ url: 'redis://redis:6379' });

  req.redisGet = promisify(client.get).bind(client);

  next();
});
