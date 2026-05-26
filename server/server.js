/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\server.js

   Timestamp:
   26 May 2026 13:25 Sydney

   PURPOSE:
   SAFE MODE operational runtime.

   IMPORTANT:
   - Preserves Next.js operational platform
   - Preserves Express routing
   - Preserves Garage/Fuel/Mobile workflows
   - Preserves APIs
   - Disables unstable realtime SOC runtime
   - Disables telemetry ingestion loops
   - Disables Socket.IO detection runtime

   SAFE MODE STATUS:
   ENABLED
===================================================== */

const express =
require("express")

const http =
require("http")

const next =
require("next")

const { Server } =
require("socket.io")

// =====================================================
// NEXT.JS
// =====================================================

const dev =
process.env.NODE_ENV !== "production"

const app =
next({ dev })

const handler =
app.getRequestHandler()

// =====================================================
// PREPARE APP
// =====================================================

app.prepare().then(() => {

  const expressApp =
  express()

  const server =
  http.createServer(expressApp)

  // ===================================================
  // SAFE MODE SOCKET INITIALISATION
  // ===================================================

  const io =
  new Server(server, {

    cors: {

      origin:"*"
    }
  })

  console.log("")
  console.log("================================================")
  console.log("JUSTDEFENDERS SAFE MODE")
  console.log("================================================")
  console.log("")
  console.log("Operational Platform ACTIVE")
  console.log("Garage Workflows ACTIVE")
  console.log("Fuel Intelligence ACTIVE")
  console.log("Mobile Platform ACTIVE")
  console.log("Timeline Workflows ACTIVE")
  console.log("Notification Workflows ACTIVE")
  console.log("")
  console.log("Realtime Detection Runtime DISABLED")
  console.log("Telemetry Ingestion DISABLED")
  console.log("SOC Runtime DISABLED")
  console.log("Advanced Detection Engine DISABLED")
  console.log("Windows Collector DISABLED")
  console.log("Socket Detection Runtime DISABLED")
  console.log("")

  // ===================================================
  // SAFE MODE SOCKETS
  // ===================================================

  io.on("connection", (

    socket

  ) => {

    console.log(
      "SAFE MODE client connected"
    )

    socket.emit(

      "platform-status",

      {

        safeMode:true,

        operational:true,

        realtime:false,

        telemetry:false,

        detection:false,

        timestamp:new Date()
      }
    )

    socket.on("disconnect", () => {

      console.log(
        "SAFE MODE client disconnected"
      )
    })
  })

  // ===================================================
  // NEXT.JS HANDLER
  // ===================================================

  expressApp.use((req, res) => {

    handler(req, res)
  })

  // ===================================================
  // START SERVER
  // ===================================================

  server.listen(8081, () => {

    console.log("")
    console.log("================================================")
    console.log("JUSTDEFENDERS PLATFORM ONLINE")
    console.log("================================================")
    console.log("")
    console.log("Platform:")
    console.log("http://localhost:8081")
    console.log("")
    console.log("SAFE MODE ACTIVE")
    console.log("")
  })
})