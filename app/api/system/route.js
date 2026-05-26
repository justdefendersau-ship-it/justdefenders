// ============================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\system\route.js
//
// Timestamp:
// 26 May 2026 09:55 Sydney
// ============================================================
//
// PURPOSE:
// Windows 11 compatible system telemetry endpoint.
// Replaces deprecated WMIC usage with PowerShell CIM.
// ============================================================

import fs from "fs"
import path from "path"
import { execSync } from "child_process"

// ============================================================
// DISK USAGE TELEMETRY
// ============================================================

function getDiskUsage() {

  try {

    const output = execSync(
      'powershell -Command "Get-CimInstance Win32_LogicalDisk | Select-Object DeviceID,Size,FreeSpace | ConvertTo-Json"'
    ).toString()

    const disks = JSON.parse(output)

    const cDrive = Array.isArray(disks)
      ? disks.find(
          disk => disk.DeviceID === "C:"
        )
      : disks

    if (!cDrive) {
      return 0
    }

    const free =
      parseInt(cDrive.FreeSpace || 0)

    const size =
      parseInt(cDrive.Size || 0)

    if (size === 0) {
      return 0
    }

    const used = size - free

    const percent =
      Math.round((used / size) * 100)

    return percent

  } catch (error) {

    console.error(
      "Disk telemetry failure:",
      error
    )

    return 0
  }
}

// ============================================================
// API ROUTE
// ============================================================

export async function GET() {

  const logFile = path.join(
    process.cwd(),
    "../data/system.log"
  )

  const logExists =
    fs.existsSync(logFile)

  const logSize = logExists
    ? fs.statSync(logFile).size
    : 0

  const diskPercent =
    getDiskUsage()

  let usageState = true

  if (diskPercent > 85) {
    usageState = "warn"
  }

  if (diskPercent > 95) {
    usageState = false
  }

  return Response.json({

    heartbeat: Date.now(),

    storage: {
      percent: diskPercent
    },

    services: {

      api: true,

      harvester:
        logSize > 0
          ? true
          : "warn",

      crawler: "warn",

      decision: true,

      charts: true,

      logs: logExists,

      storage_local: true,

      storage_cloud: "warn",

      storage_usage: usageState,

      email: "warn",

      alerts: "warn",

      prediction: true,

      intelligence: true
    }
  })
}