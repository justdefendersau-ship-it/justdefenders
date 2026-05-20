/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\platform\service-bootstrap.js
===================================================== */

const logger =
require("../shared/logger")

const health =
require("./health-manager")

function bootstrapService(options){

  logger.info(
    "Bootstrapping service: " +
    options.name
  )

  health.registerService({

    name:
    options.name,

    status:
    "STARTING"
  })

  process.on(
    "SIGINT",
    () => {

      logger.warn(
        options.name +
        " shutting down gracefully"
      )

      process.exit(0)
    }
  )

  process.on(
    "uncaughtException",
    error => {

      logger.error(
        options.name +
        " uncaught exception: " +
        error.message
      )
    }
  )

  setInterval(() => {

    health.heartbeat(
      options.name
    )

  }, 10000)

  logger.info(
    options.name +
    " online"
  )
}

module.exports = {

  bootstrapService
}