
async function test() {
  const Redis = require('ioredis')

const redis = new Redis({
  port: 6378, // Redis port
  host: "127.0.0.1", // Redis host
  // family: 4, // 4 (IPv4) or 6 (IPv6)
  password: "123456",
  db: 0
})
await redis.set('q', 123456)
const keys =await redis.keys('*')
console.log(keys)
}
test()