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

const {
  startHarvesterManagedService,
  stopHarvesterManagedService,
  getHarvesterRuntimeStatus
} = require("./platform/harvester-service")

const health = require("./platform/health-manager")

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

  server.use(express.json())

  // ================================================================
  // START WEBSOCKET RUNTIME
  // ================================================================

  // startWebsocketRuntime()

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

  const harvesterRuntime = startHarvesterManagedService({ runOnce: true, skipBootstrap: false })

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

server.get(

  "/ping",

  (
    req,
    res
  ) => {

    
    res.json({

      success: true,

      endpoint: "ping"

    })

  }

)
server.get(
  "/runtime/health",
  (_req, res) => {
    const status = getHarvesterRuntimeStatus()

    res.json({
      success: true,
      service: status,
      platformHealth: health.getHealth()
    })
  }
)

server.post(
  "/runtime/command",
  async (req, res) => {
    const body = req.body || {}

    if (body.action === "stop") {
      await stopHarvesterManagedService()
      return res.json({ success: true, running: false })
    }

    if (body.action === "start") {
      startHarvesterManagedService({ runOnce: false, skipBootstrap: false })
      return res.json({ success: true, running: true })
    }

    res.json({ success: true, status: getHarvesterRuntimeStatus() })
  }
)

server.all(

  "*",

  async (

    req,

    res

  ) => {

    console.log(

      `[HTTP] ${req.method} ${req.url}`

    )

    try {

      await handle(

        req,

        res

      )

    }

    catch (error) {

      console.error(

        "NEXT.JS REQUEST FAILURE",

        error

      )

      if (!res.headersSent) {

        res.status(500).json({

          success: false,

          error: "Next.js runtime failure."

        })

      }

    }

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