/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\observability\metrics-exporter.js
===================================================== */

const http =
require("http")

const metrics = {

  uptime:0,

  telemetryEvents:0,

  alerts:0,

  aiOperations:0
}

http.createServer(

  (req,res) => {

    res.writeHead(
      200,
      {
        "Content-Type":
        "text/plain"
      }
    )

    res.end(`

jd_platform_uptime ${process.uptime()}

jd_platform_memory ${
process.memoryUsage().heapUsed
}

jd_platform_alerts ${
metrics.alerts
}

jd_platform_ai ${
metrics.aiOperations
}
`)
  }

).listen(9464)

console.log(
  "Metrics exporter active"
)