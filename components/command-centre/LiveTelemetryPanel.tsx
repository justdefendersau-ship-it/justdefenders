/*
===============================================================================
File: C:\dev\justdefenders\frontend\components\command-centre\LiveTelemetryPanel.tsx
Timestamp: 14 May 2026 09:00
Purpose:
Live telemetry monitoring panel

JustDefenders ©
===============================================================================
*/

"use client"

import React, {
  useEffect,
  useState
}
from "react"

type TelemetryState = {

  coolantTemp: number

  oilPressure: number

  engineLoad: number

  batteryVoltage: number
}

type MetricBarProps = {

  label: string

  value: number

  suffix?: string

  percentage: number
}

function MetricBar(props: MetricBarProps) {

  return (

    <div
      style={{

        marginBottom: "20px"
      }}
    >

      <div
        style={{

          display: "flex",

          justifyContent: "space-between",

          color: "#ffffff",

          marginBottom: "6px"
        }}
      >

        <span>{props.label}</span>

        <span>
          {props.value}
          {props.suffix}
        </span>

      </div>

      <div
        style={{

          width: "100%",

          height: "10px",

          background: "#1f2937",

          borderRadius: "999px",

          overflow: "hidden"
        }}
      >

        <div
          style={{

            width: `${props.percentage}%`,

            height: "100%",

            background:
              props.percentage > 85
                ? "#ff4d4f"
                : props.percentage > 65
                ? "#faad14"
                : "#52c41a"
          }}
        />

      </div>
    </div>
  )
}

export default function LiveTelemetryPanel() {

  /*
  ===========================================================================
  JustDefenders ©
  Telemetry object state
  ===========================================================================
  */

  const [telemetry, setTelemetry] =
    useState<TelemetryState>({

      coolantTemp: 72,

      oilPressure: 55,

      engineLoad: 34,

      batteryVoltage: 13
    })

  /*
  ===========================================================================
  JustDefenders ©
  Simulated telemetry refresh
  ===========================================================================
  */

  useEffect(() => {

    const interval =
      setInterval(() => {

        setTelemetry({

          coolantTemp:
            70 +
            Math.floor(
              Math.random() * 35
            ),

          oilPressure:
            40 +
            Math.floor(
              Math.random() * 45
            ),

          engineLoad:
            Math.floor(
              Math.random() * 100
            ),

          batteryVoltage:
            Number(
              (
                12 +
                Math.random() * 2
              ).toFixed(1)
            )
        })

      }, 3000)

    return () => {

      clearInterval(interval)
    }

  }, [])

  return (

    <div
      style={{

        background: "#0f172a",

        padding: "24px",

        borderRadius: "16px"
      }}
    >

      <h2
        style={{

          color: "#ffffff",

          marginBottom: "24px"
        }}
      >
        Live Telemetry
      </h2>

      <MetricBar
        label="Coolant Temp"
        value={telemetry.coolantTemp}
        suffix="°C"
        percentage={telemetry.coolantTemp}
      />

      <MetricBar
        label="Oil Pressure"
        value={telemetry.oilPressure}
        suffix=" PSI"
        percentage={telemetry.oilPressure}
      />

      <MetricBar
        label="Engine Load"
        value={telemetry.engineLoad}
        suffix="%"
        percentage={telemetry.engineLoad}
      />

      <MetricBar
        label="Battery Voltage"
        value={telemetry.batteryVoltage}
        suffix="V"
        percentage={telemetry.batteryVoltage * 7}
      />
    </div>
  )
}
