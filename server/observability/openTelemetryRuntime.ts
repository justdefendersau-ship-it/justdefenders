/* =====================================================
   JustDefenders ©
   File:
   /server/observability/openTelemetryRuntime.ts

   Timestamp:
   14 May 2026 12:15 (Sydney)

   PURPOSE:
   Enterprise OpenTelemetry observability
===================================================== */

import {
  NodeSDK
}
from "@opentelemetry/sdk-node"

const sdk =
new NodeSDK()

export async function startTelemetry(){

  await sdk.start()

  console.log(
    "OpenTelemetry runtime started"
  )
}
