/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\redis\redis-config.js
===================================================== */

module.exports = {

  host:
  process.env.REDIS_HOST ||
  "127.0.0.1",

  port:
  process.env.REDIS_PORT ||
  6379,

  db:
  process.env.REDIS_DB ||
  0
}