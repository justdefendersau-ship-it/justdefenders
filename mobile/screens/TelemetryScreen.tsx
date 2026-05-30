import React, {
  useState
}
from "react"

import {
  View,
  Text,
  Button
}
from "react-native"

import {

  scanForOBD,

  getMockTelemetry,

  analyzeTelemetry

}
from "../services/obdService"

import {

  saveOfflineEvent

}
from "../services/offlineSyncService"

import {

  emitOperationalEvent

}
from "../services/events/operationalEventBus"

import {

  syncOperationalEvents

}
from "../services/mobileSyncService"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\mobile\screens\TelemetryScreen.tsx
//
// Timestamp:
// 27 May 2026 10:05 Sydney
//
// Purpose:
// - Survivability telemetry runtime
// - Offline expedition persistence
// - Unified operational event emission
// - Cross-platform operational sync
// =====================================================

export default function TelemetryScreen(){

  const [
    telemetry,
    setTelemetry
  ] = useState<any>(null)

  const [
    alerts,
    setAlerts
  ] = useState<any[]>([])

  const [
    syncStatus,
    setSyncStatus
  ] = useState("")

  // =====================================================
  // CONNECT
  // =====================================================

  async function connect(){

    setSyncStatus(
      "Connecting..."
    )

    await scanForOBD()

    const liveTelemetry =
      getMockTelemetry()

    const telemetryAlerts =

      analyzeTelemetry(
        liveTelemetry
      )

    setTelemetry(
      liveTelemetry
    )

    setAlerts(
      telemetryAlerts
    )

    // ===================================================
    // OFFLINE STORAGE
    // ===================================================

    await saveOfflineEvent(

      "telemetry",

      {
        telemetry:
          liveTelemetry,

        alerts:
          telemetryAlerts
      }
    )

    // ===================================================
    // EMIT TELEMETRY EVENT
    // ===================================================

    emitOperationalEvent({

      id:
        Date.now().toString(),

      timestamp:
        new Date().toISOString(),

      type:
        "TELEMETRY",

      severity:
        "LOW",

      source:
        "mobile-telemetry",

      title:
        "Telemetry session captured",

      description:
        "Mobile telemetry survivability capture completed.",

      telemetry:
        liveTelemetry
    })

    // ===================================================
    // EMIT ALERT EVENTS
    // ===================================================

    telemetryAlerts.forEach(
      (
        alert:any
      ) => {

        emitOperationalEvent({

          id:
            `${Date.now()}-${alert.status}`,

          timestamp:
            new Date().toISOString(),

          type:
            "SURVIVABILITY_ALERT",

          severity:
            alert.severity,

          source:
            "telemetry-analysis",

          title:
            alert.status,

          description:
            alert.message,

          telemetry:
            liveTelemetry
        })
      }
    )

    // ===================================================
    // STATUS
    // ===================================================

    setSyncStatus(
      "Operational telemetry stored and emitted"
    )

    // ===================================================
    // WEB PLATFORM SYNC
    // ===================================================

    await syncOperationalEvents()

    setSyncStatus(
      "Operational telemetry synchronized"
    )
  }

  // =====================================================
  // ALERT STYLING
  // =====================================================

  function getAlertColour(
    severity:string
  ){

    switch(severity){

      case "HIGH":
        return "#ef4444"

      case "MEDIUM":
        return "#f59e0b"

      default:
        return "#22c55e"
    }
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (

    <View style={{
      padding:20
    }}>

      <Text style={{
        fontSize:28,
        fontWeight:"bold"
      }}>

        Live Vehicle Telemetry

      </Text>

      <Button
        title="Connect ELM327"
        onPress={connect}
      />

      {/* =================================================
          STATUS
      ================================================= */}

      {syncStatus !== "" && (

        <Text style={{
          marginTop:20,
          color:"#888"
        }}>

          {syncStatus}

        </Text>
      )}

      {/* =================================================
          TELEMETRY
      ================================================= */}

      {telemetry && (

        <View style={{
          marginTop:30
        }}>

          <Text>
            Coolant:
            {" "}
            {telemetry.coolantTemp}
            °C
          </Text>

          <Text>
            Voltage:
            {" "}
            {telemetry.batteryVoltage}
            V
          </Text>

          <Text>
            RPM:
            {" "}
            {telemetry.rpm}
          </Text>

          <Text>
            Speed:
            {" "}
            {telemetry.speed}
            km/h
          </Text>

          <Text>
            Boost:
            {" "}
            {telemetry.boost}
            psi
          </Text>

        </View>
      )}

      {/* =================================================
          ALERTS
      ================================================= */}

      {alerts.length > 0 && (

        <View style={{
          marginTop:30
        }}>

          <Text style={{
            fontSize:22,
            fontWeight:"bold",
            marginBottom:20
          }}>

            Survivability Alerts

          </Text>

          {alerts.map(
            (
              alert,
              index
            ) => (

              <View
                key={index}

                style={{

                  padding:16,

                  marginBottom:14,

                  borderRadius:14,

                  backgroundColor:
                    getAlertColour(
                      alert.severity
                    )
                }}
              >

                <Text style={{
                  color:"#fff",
                  fontWeight:"bold",
                  marginBottom:6
                }}>

                  {alert.status}

                </Text>

                <Text style={{
                  color:"#fff"
                }}>

                  {alert.message}

                </Text>

              </View>
            )
          )}

        </View>
      )}

    </View>
  )
}