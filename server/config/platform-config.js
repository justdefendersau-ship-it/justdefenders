/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\config\platform-config.js
===================================================== */

module.exports = {

  runtime:{

    environment:
    process.env.NODE_ENV ||
    "development",

    observability:true,

    ai:true,

    graph:true
  },

  security:{

    requireIdentity:true,

    structuredLogging:true
  },

  infrastructure:{

    database:
    process.env.DB_PROVIDER ||
    "sqlite",

    queue:
    process.env.QUEUE_PROVIDER ||
    "memory"
  }
}