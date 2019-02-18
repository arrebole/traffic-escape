const Redis = require('ioredis');

function createDbConfig(db) {
  return {
    "port": 6379,          // Redis port
    "host": '127.0.0.1',   // Redis host
    "family": 4,           // 4 (IPv4) or 6 (IPv6)
    "db": db // 第几张表
  }
}

// 链接redis数据库表0和1
const Db0 = new Redis(createDbConfig(0));
const Db1 = new Redis(createDbConfig(1));

// 验证数据库是否已经存在key
function isExist(hash) {
  return Db0.exists(hash)
}

// 储存key、value
function save(key, value) {
  Db0.set(key, '0').then(() => { });
  Db1.set(key, value).then(() => { });
}

// 从数据库读取
async function take(key) {
  let count = await Db0.get(key);
  await Db0.set(key, stringAdd(count));
  let content = await Db1.get(key);
  return { count, content };
}

function stringAdd(s) {
  let i = parseInt(s);
  i++;
  return i.toString();
}

module.exports.isExist = isExist;
module.exports.save = save;
module.exports.take = take;
