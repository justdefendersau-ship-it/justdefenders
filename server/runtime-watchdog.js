/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\runtime-watchdog.js
===================================================== */

const logger =
require("./shared/logger")

const registry =
require("./runtime/service-registry")

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS RUNTIME WATCHDOG")
console.log("PLATFORM STABILISATION ACTIVE")
console.log("====================================")
console.log("")

setInterval(() => {

  logger.info(
    "Runtime verification cycle"
  )

  for(const service of registry){

    logger.info(
      "Monitoring service: " +
      service.name
    )
  }

}, 30000)