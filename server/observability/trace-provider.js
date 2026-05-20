/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\observability\trace-provider.js
===================================================== */

const {
  NodeSDK
} = require("@opentelemetry/sdk-node")

const {
  OTLPTraceExporter
} = require(
  "@opentelemetry/exporter-trace-otlp-http"
)

const config =
require("./otel-config")

const traceExporter =
new OTLPTraceExporter({

  url:
  config.exporterEndpoint
})

const sdk =
new NodeSDK({

  traceExporter
})

sdk.start()

console.log(
  "OpenTelemetry tracing active"
)

module.exports =
sdk