// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\server\server.js
//
// Timestamp:
// 28 May 2026 05:35 Sydney
//
// PURPOSE:
// SAFE MODE operational platform runtime.
// ====================================================================

const express =
  require("express")

const next =
  require("next")

const {
  startWebsocketRuntime
} = require(
  "./websocketRuntime"
)

// ====================================================================
// CONFIG
// ====================================================================

const dev =
  process.env.NODE_ENV !== "production"

const app =
  next({
    dev
  })

const handle =
  app.getRequestHandler()

const PORT =
  8081

// ====================================================================
// PREPARE
// ====================================================================

app.prepare().then(() => {

  const server =
    express()

  // ================================================================
  // START WEBSOCKET RUNTIME
  // ================================================================

  startWebsocketRuntime()

  // ================================================================
  // SAFE MODE BANNER
  // ================================================================

  console.log("")

  console.log("================================================")

  console.log(
    "JUSTDEFENDERS SAFE MODE"
  )

  console.log("================================================")

  console.log("")

  console.log(
    "Operational Platform ACTIVE"
  )

  console.log(
    "Garage Workflows ACTIVE"
  )

  console.log(
    "Fuel Intelligence ACTIVE"
  )

  console.log(
    "Mobile Platform ACTIVE"
  )

  console.log(
    "Timeline Workflows ACTIVE"
  )

  console.log(
    "Notification Workflows ACTIVE"
  )

  console.log("")

  console.log(
    "Realtime Detection Runtime DISABLED"
  )

  console.log(
    "Telemetry Ingestion DISABLED"
  )

  console.log(
    "SOC Runtime DISABLED"
  )

  console.log(
    "Advanced Detection Engine DISABLED"
  )

  console.log(
    "Windows Collector DISABLED"
  )

  console.log(
    "Socket Detection Runtime DISABLED"
  )

  console.log("")

  // ================================================================
  // HEALTH CHECK
  // ================================================================

  server.get(

    "/health",

    (
      req,
      res
    ) => {

      res.json({

        success:true,

        platform:
          "JustDefenders",

        mode:
          "SAFE_MODE",

        port:
          PORT
      })
    }
  )

  // ================================================================
  // NEXT.JS HANDLER
  // ================================================================

  server.all(

    "*",

    (
      req,
      res
    ) => {

      return handle(
        req,
        res
      )
    }
  )

  // ================================================================
  // START SERVER
  // ================================================================

  server.listen(

    PORT,

    "0.0.0.0",

    () => {

      console.log("")

      console.log("================================================")

      console.log(

        `JustDefenders Operational Platform running on ${PORT}`

      )

      console.log("================================================")

      console.log("")
    }
  )
})