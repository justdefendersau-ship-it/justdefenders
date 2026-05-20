/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\observability\otel-config.js
===================================================== */

module.exports = {

  serviceName:
  "justdefenders-platform",

  exporterEndpoint:
  process.env.OTEL_EXPORTER ||
  "http://localhost:4318/v1/traces",

  environment:
  process.env.NODE_ENV ||
  "development"
}