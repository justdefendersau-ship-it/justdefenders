/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\shared\database\prisma.js
===================================================== */

const {
  PrismaClient
} = require("@prisma/client")

const prisma =
new PrismaClient({

  log:[
    "warn",
    "error"
  ]
})

module.exports = prisma