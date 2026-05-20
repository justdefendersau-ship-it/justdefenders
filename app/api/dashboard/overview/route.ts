import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    platform:{

      suppliers:31,

      activeWorkflows:18,

      diagnosticsToday:44,

      voiceSessions:12,

      barcodeScans:28,

      expeditionAlerts:3,

      searchQueries:244,

      workflowHealth:"HEALTHY"
    },

    timestamp:
    new Date().toISOString()
  })
}