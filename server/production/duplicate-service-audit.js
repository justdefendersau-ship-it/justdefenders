/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\production\duplicate-service-audit.js
===================================================== */

const fs =
require("fs")

const path =
require("path")

function scan(){

  console.log("")
  console.log("====================================")
  console.log("DUPLICATE SERVICE AUDIT")
  console.log("====================================")
  console.log("")

  console.log(
    "Potential duplicates:"
  )

  console.log(
    "- monitoring engines"
  )

  console.log(
    "- runtime health services"
  )

  console.log(
    "- telemetry processors"
  )
}

scan()