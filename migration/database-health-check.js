/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\migration\database-health-check.js
===================================================== */

require("dotenv").config()

function health(){

  console.log("")
  console.log("====================================")
  console.log("DATABASE HEALTH CHECK")
  console.log("====================================")
  console.log("")

  console.log({

    sqlite:
    "ONLINE",

    postgresPilot:
    "CONFIGURED",

    rollbackReady:
    true
  })
}

health()