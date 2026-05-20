import React, {
  useEffect,
  useState
} from "react"

import {
  View,
  Text,
  Button
} from "react-native"

import {

  scanForOBD,

  getMockTelemetry

}
from "../services/obdService"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\mobile\screens\TelemetryScreen.tsx
//
// Timestamp:
// 2026-05-07 19:00
//
// Purpose:
// - Live telemetry screen
// =====================================================

export default function TelemetryScreen(){

  const [telemetry,setTelemetry] =
    useState<any>(null)

  // =====================================================
  // CONNECT
  // =====================================================

  async function connect(){

    await scanForOBD()

    setTelemetry(

      getMockTelemetry()
    )
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

    </View>
  )
}
