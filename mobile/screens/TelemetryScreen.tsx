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

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\mobile\screens\TelemetryScreen.tsx
//
// Timestamp:
// 2026-05-26 22:20 Sydney
//
// Purpose:
// - Live telemetry
// - Survivability intelligence
// - Offline expedition persistence
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

    setSyncStatus(
      "Operational telemetry stored offline"
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