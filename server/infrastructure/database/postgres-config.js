/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\infrastructure\database\postgres-config.js
===================================================== */

module.exports = {

  host:
  process.env.POSTGRES_HOST ||
  "localhost",

  port:
  process.env.POSTGRES_PORT ||
  5432,

  database:
  process.env.POSTGRES_DB ||
  "justdefenders",

  user:
  process.env.POSTGRES_USER ||
  "jd_admin",

  ssl:false
}