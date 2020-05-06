// Sets up RedisGears' WriteBehind
const redis = require('../config/redis')

const arg = process.argv[2];
let conn;

if (!arg) {
  console.error(`Usage: ${process.argv[0]} ${process.argv[1]} [redis|cluster]`);
  process.exit(1);
} else if (arg == 'redis') {
  conn = redis.standalone;
} else if (arg == 'cluster') {
  conn = redis.cluster;
} else {
  console.error(`Invalid argument: '${arg}'`);
  process.exit(1);
}

const fs = require('fs');
const writebehind = fs.readFileSync('writebehind/writebehind.py')
  .toString()
  .replace('$MYSQL_ROOT_PASSWORD', process.env.MYSQL_ROOT_PASSWORD);
const requirements = fs.readFileSync('writebehind/requirements.txt')
  .toString()
  .split('\n')
  .filter(x => x.length > 0);

conn.send_command('RG.PYEXECUTE', writebehind, 'REQUIREMENTS', ...requirements)
.then(_ => {
  console.log(`RedisGears WriteBehind set up on '${arg}'.`);
  process.exit();
})
.catch(err => {
  console.error(`RedisGears WriteBehind '${arg}' setup failed: ${err}`);
  process.exit(1);
});
