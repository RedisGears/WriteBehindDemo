const nanoexpress = require('nanoexpress');
const redis = require('./config/redis').standalone;
const cluster = require('./config/redis').cluster;
const db = require('./config/database').pool;

const port = 8080;
const app = nanoexpress();
const ok = { status: 'ok' };

// An endpoint for checking if the app is up
app.get('/', (req, res) => {
  return res.send(ok);
});

// An endpoint for establishing the app's upper bound
app.post('/null', async (_, res) => {
  return res.send(ok);
});

// An endpoint for writing to Redis standalone only
app.post('/redis', async (req, res) => {
  const key = `hash:${req.body.id}`;
  const data = {
    id: req.body.id,
    temp: req.body.temp,
  };
  return redis.hmset(key, data)
    .then(_ => {
      res.send(ok);
  });
});

// An endpoint for writing to Redis cluster only
app.post('/cluster', async (req, res) => {
  const key = `hash:${req.body.id}`;
  const data = {
    id: req.body.id,
    temp: req.body.temp,
  };
  return cluster.hmset(key, data)
    .then(_ => {
      res.send(ok);
  });
});

// An endpoint for writing to the database only
app.post('/db', async (req, res) => {
  const query = 'REPLACE INTO users VALUES(?, ?)'
  const key = req.body.id;
  const temp = req.body.temp;
  return db.query(query, [key, temp], function (error) {
    if (error) throw error;
    res.send(ok);
  });
});

// An endpoint for write behind from Redis standalone to the database
app.post('/wbredis', async (req, res) => {
  const key = `user:${req.body.id}`;
  const data = {
    id: req.body.id,
    temp: req.body.temp,
  };
  return redis.hmset(key, data)
    .then(_ => {
      res.send(ok);
  });
});

// An endpoint for write behind from Redis cluster to the database
app.post('/wbcluster', async (req, res) => {
  const key = `user:${req.body.id}`;
  const data = {
    id: req.body.id,
    temp: req.body.temp,
  };
  return cluster.hmset(key, data)
    .then(_ => {
      res.send(ok);
  });
});

console.log(`App listening on port ${port}`);
app.listen(port);