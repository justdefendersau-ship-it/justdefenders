// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\notifications\operationalNotificationRuntime.ts
//
// Timestamp:
// 27 May 2026 21:40 Sydney
//
// PURPOSE:
// Operational notification runtime.
// ====================================================================

import {

  OperationalNotification

}
from "@/types/OperationalNotification"

import {

  detectOperationalAnomalies

}
from "@/lib/fose/operationalAnomalyDetectionEngine"

import {

  generateOperationalAdvisories

}
from "@/lib/fose/expeditionAdvisoryEngine"

// ====================================================================
// MEMORY STORE
// ====================================================================

const notifications:
  OperationalNotification[] = []

// ====================================================================
// GENERATE
// ====================================================================

export function generateOperationalNotifications(){

  notifications.length = 0

  const anomalies =

    detectOperationalAnomalies()

  const advisories =

    generateOperationalAdvisories()

  // ================================================================
  // ANOMALIES
  // ================================================================

  anomalies.forEach(
    (
      anomaly:any,
      index:number
    ) => {

      notifications.push({

        id:
          `ANOM-${index}`,

        timestamp:
          new Date().toISOString(),

        severity:
          anomaly.severity,

        category:
          anomaly.category,

        title:
          anomaly.title,

        message:
          anomaly.description,

        acknowledged:
          false
      })
    }
  )

  // ================================================================
  // ADVISORIES
  // ================================================================

  advisories.forEach(
    (
      advisory:any,
      index:number
    ) => {

      notifications.push({

        id:
          `ADV-${index}`,

        timestamp:
          new Date().toISOString(),

        severity:
          advisory.severity,

        category:
          advisory.category,

        title:
          advisory.title,

        message:
          advisory.recommendation,

        acknowledged:
          false
      })
    }
  )

  return notifications
}

// ====================================================================
// GET
// ====================================================================

export function getOperationalNotifications(){

  return notifications
}