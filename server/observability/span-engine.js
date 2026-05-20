/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\observability\span-engine.js
===================================================== */

const {
  trace
} = require("@opentelemetry/api")

const tracer =
trace.getTracer(
  "justdefenders-runtime"
)

async function traceOperation(
  name,
  operation
){

  const span =
  tracer.startSpan(name)

  try {

    const result =
    await operation()

    span.end()

    return result

  } catch(error){

    span.recordException(error)

    span.end()

    throw error
  }
}

module.exports = {

  traceOperation
}