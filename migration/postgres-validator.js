/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\migration\postgres-validator.js
===================================================== */

require("dotenv").config()

function validate(){

  console.log("")
  console.log("====================================")
  console.log("POSTGRESQL PILOT VALIDATION")
  console.log("====================================")
  console.log("")

  console.log({

    provider:
    process.env.DB_PROVIDER,

    postgresHost:
    process.env.POSTGRES_HOST,

    postgresDatabase:
    process.env.POSTGRES_DB,

    sqliteActive:
    true,

    cutover:
    false
  })
}

validate()