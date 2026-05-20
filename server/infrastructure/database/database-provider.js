/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\infrastructure\database\database-provider.js
===================================================== */

const prisma =
require("../../shared/database/prisma")

class DatabaseProvider {

  constructor(){

    this.provider =
    process.env.DB_PROVIDER ||
    "sqlite"
  }

  async health(){

    return {

      provider:
      this.provider,

      status:
      "ONLINE"
    }
  }

  getClient(){

    return prisma
  }
}

module.exports =
new DatabaseProvider()