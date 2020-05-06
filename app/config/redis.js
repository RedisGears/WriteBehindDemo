// Redis connections
const redis = require('ioredis');
const env = process.env.NODE_ENV || 'development';

const standalone = new redis(6379, env === 'development'
  ? 'localhost'
  : 'redisgears'
);

const cluster = new redis.Cluster([
  {
    port: 30001,
    host: env === 'development'
      ? 'localhost'
      : 'rgcluster',
  },
]);

module.exports = { standalone, cluster }
