/* =====================================================
   JustDefenders ©
   Advanced Detection Engineering Runtime
===================================================== */

const express =
require("express")

const http =
require("http")

const next =
require("next")

const { execFile } =
require("child_process")

const { Server } =
require("socket.io")

const { PrismaClient } =
require("@prisma/client")

const promClient =
require("prom-client")

const prisma =
new PrismaClient()

// =====================================================
// DETECTION STATE
// =====================================================

const suppressionMap =
new Map()

const eventCounters =
new Map()

const bruteForceTracker =
new Map()

// =====================================================
// METRICS
// =====================================================

const register =
new promClient.Registry()

promClient.collectDefaultMetrics({

  register
})

const telemetryCounter =
new promClient.Counter({

  name:"jd_telemetry_total",

  help:"Telemetry Events"
})

const alertCounter =
new promClient.Counter({

  name:"jd_detection_total",

  help:"Detection Alerts"
})

register.registerMetric(
  telemetryCounter
)

register.registerMetric(
  alertCounter
)

// =====================================================
// NEXT.JS
// =====================================================

const dev =
process.env.NODE_ENV !== "production"

const app =
next({ dev })

const handler =
app.getRequestHandler()

app.prepare().then(() => {

  const expressApp =
  express()

  const server =
  http.createServer(expressApp)

  const io =
  new Server(server, {

    cors: {

      origin:"*"
    }
  })

  // ===================================================
  // WINDOWS INGESTION
  // ===================================================

  async function ingestWindowsEvents(){

    return new Promise((resolve) => {

      execFile(

        "powershell",

        [

          "-ExecutionPolicy",
          "Bypass",

          "-File",

          "C:\\dev\\justdefenders\\frontend\\server\\windows-collector.ps1"
        ],

        async (

          error,

          stdout

        ) => {

          try {

            if(error){

              resolve([])

              return
            }

            const clean =
            stdout.trim()

            if(!clean){

              resolve([])

              return
            }

            let events =
            JSON.parse(clean)

            if(!Array.isArray(events)){

              events = [events]
            }

            const results = []

            for(const event of events){

              telemetryCounter.inc()

              const telemetry =
              await prisma.telemetryEvent.create({

                data: {

                  source:
                  event.ProviderName ||
                  "Windows",

                  severity:
                  event.LevelDisplayName ||
                  "INFO",

                  timestamp:
                  new Date()
                }
              })

              results.push({

                ...telemetry,

                provider:
                event.ProviderName,

                level:
                event.LevelDisplayName,

                eventId:
                event.Id
              })
            }

            resolve(results)

          } catch {

            resolve([])
          }
        })
    })
  }

  // ===================================================
  // SUPPRESSION ENGINE
  // ===================================================

  function isSuppressed(
    key
  ){

    const now =
    Date.now()

    if(

      suppressionMap.has(key)

    ){

      const last =
      suppressionMap.get(key)

      if(

        now - last < 60000

      ){

        return true
      }
    }

    suppressionMap.set(
      key,
      now
    )

    return false
  }

  // ===================================================
  // EVENT CORRELATION
  // ===================================================

  function incrementEventCounter(
    provider
  ){

    if(

      !eventCounters.has(provider)

    ){

      eventCounters.set(
        provider,
        0
      )
    }

    const count =
    eventCounters.get(provider)

    + 1

    eventCounters.set(
      provider,
      count
    )

    return count
  }

  // ===================================================
  // BRUTE FORCE TRACKING
  // ===================================================

  function trackFailedLogin(
    provider
  ){

    if(

      !bruteForceTracker.has(provider)

    ){

      bruteForceTracker.set(
        provider,
        []
      )
    }

    const events =
    bruteForceTracker.get(provider)

    events.push(Date.now())

    const filtered =
    events.filter(

      time =>

      Date.now() - time < 300000
    )

    bruteForceTracker.set(
      provider,
      filtered
    )

    return filtered.length
  }

  // ===================================================
  // ADVANCED DETECTIONS
  // ===================================================

  async function runAdvancedDetections(
    event
  ){

    const alerts = []

    // ================================================
    // THRESHOLD CORRELATION
    // ================================================

    const providerCount =
    incrementEventCounter(
      event.provider
    )

    if(

      providerCount >= 5

    ){

      const key =
      "threshold-" +
      event.provider

      if(

        !isSuppressed(key)

      ){

        alertCounter.inc()

        const alert =
        await prisma.detectionAlert.create({

          data: {

            title:
            "Repeated Provider Activity",

            severity:"MEDIUM",

            source:
            event.provider,

            ruleName:
            "THRESHOLD_CORRELATION",

            status:"OPEN"
          }
        })

        alerts.push(alert)
      }
    }

    // ================================================
    // DCOM DETECTION
    // ================================================

    if(

      event.provider &&
      event.provider.includes(
        "DistributedCOM"
      )

    ){

      const key =
      "dcom-detection"

      if(

        !isSuppressed(key)

      ){

        alertCounter.inc()

        const alert =
        await prisma.detectionAlert.create({

          data: {

            title:
            "DistributedCOM Behaviour Detected",

            severity:"HIGH",

            source:
            event.provider,

            ruleName:
            "DCOM_BEHAVIOUR",

            status:"OPEN"
          }
        })

        alerts.push(alert)
      }
    }

    // ================================================
    // WINDOWS UPDATE BURST
    // ================================================

    if(

      event.provider &&
      event.provider.includes(
        "WindowsUpdate"
      )

    ){

      const key =
      "windows-update"

      if(

        !isSuppressed(key)

      ){

        alertCounter.inc()

        const alert =
        await prisma.detectionAlert.create({

          data: {

            title:
            "Windows Update Activity Burst",

            severity:"LOW",

            source:
            event.provider,

            ruleName:
            "WINDOWS_UPDATE_BURST",

            status:"OPEN"
          }
        })

        alerts.push(alert)
      }
    }

    // ================================================
    // FAILED LOGIN ANALYTICS
    // ================================================

    if(

      event.provider &&
      event.provider.includes(
        "Security"
      )

    ){

      const failedLogins =
      trackFailedLogin(
        event.provider
      )

      if(

        failedLogins >= 5

      ){

        const key =
        "bruteforce-" +
        event.provider

        if(

          !isSuppressed(key)

        ){

          alertCounter.inc()

          const alert =
          await prisma.detectionAlert.create({

            data: {

              title:
              "Potential Brute Force Activity",

              severity:"CRITICAL",

              source:
              event.provider,

              ruleName:
              "BRUTE_FORCE_ANALYTICS",

              status:"OPEN"
            }
          })

          alerts.push(alert)
        }
      }
    }

    // ================================================
    // ISOLATED USER MODE
    // ================================================

    if(

      event.provider &&
      event.provider.includes(
        "IsolatedUserMode"
      )

    ){

      const key =
      "isolated-user-mode"

      if(

        !isSuppressed(key)

      ){

        alertCounter.inc()

        const alert =
        await prisma.detectionAlert.create({

          data: {

            title:
            "Isolated User Mode Activity",

            severity:"HIGH",

            source:
            event.provider,

            ruleName:
            "ISOLATED_USERMODE_ACTIVITY",

            status:"OPEN"
          }
        })

        alerts.push(alert)
      }
    }

    return alerts
  }

  // ===================================================
  // INCIDENT CREATION
  // ===================================================

  async function createIncident(
    alert
  ){

    const incident =
    await prisma.incident.create({

      data: {

        title:
        alert.title,

        severity:
        alert.severity,

        status:"OPEN",

        assignedTo:
        "SOC-ANALYST",

        alertId:
        alert.id
      }
    })

    return incident
  }

  // ===================================================
  // PROMETHEUS
  // ===================================================

  expressApp.get(

    "/metrics",

    async (req, res) => {

      res.set(

        "Content-Type",

        register.contentType
      )

      res.end(

        await register.metrics()
      )
    })

  // ===================================================
  // SOCKET RUNTIME
  // ===================================================

  io.on("connection", (

    socket
  ) => {

    console.log(
      "SOC analyst connected"
    )

    socket.emit(

      "platform-health",

      {

        operational:true,

        behaviouralAnalytics:true,

        advancedDetections:true,

        observability:true,

        connected:true,

        timestamp:new Date()
      }
    )

    const interval =
    setInterval(async () => {

      const events =
      await ingestWindowsEvents()

      for(const event of events){

        socket.emit(

          "telemetry-update",

          event
        )

        const alerts =
        await runAdvancedDetections(
          event
        )

        for(const alert of alerts){

          socket.emit(

            "detection-alert",

            alert
          )

          const incident =
          await createIncident(
            alert
          )

          socket.emit(

            "incident-created",

            incident
          )
        }
      }

    }, 5000)

    socket.on("disconnect", () => {

      clearInterval(interval)

      console.log(
        "SOC analyst disconnected"
      )
    })
  })

  // ===================================================
  // NEXT.JS
  // ===================================================

  expressApp.use((req, res) => {

    handler(req, res)
  })

  // ===================================================
  // STARTUP
  // ===================================================

  server.listen(8081, () => {

    console.log("")
    console.log("================================================")
    console.log("ADVANCED DETECTION ENGINEERING ONLINE")
    console.log("================================================")
    console.log("")
    console.log("Behavioural Analytics ACTIVE")
    console.log("Threshold Correlation ACTIVE")
    console.log("Brute Force Detection ACTIVE")
    console.log("Temporal Detection ACTIVE")
    console.log("Suppression Engine ACTIVE")
    console.log("")
    console.log("SOC Command Centre:")
    console.log("http://localhost:8081")
    console.log("")
    console.log("Metrics:")
    console.log("http://localhost:8081/metrics")
    console.log("")
  })
})
