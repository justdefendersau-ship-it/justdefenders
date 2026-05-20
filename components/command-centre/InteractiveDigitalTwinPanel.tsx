/*
===============================================================================
File: C:\dev\justdefenders\frontend\components\command-centre\InteractiveDigitalTwinPanel.tsx
Timestamp: 14 May 2026 09:00
Purpose:
Interactive Digital Twin telemetry panel

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

  engineLoad: number

  coolantTemp: number

  batteryVoltage: number

  fuelLevel: number
}

type SystemNodeProps = {

  title: string

  value: string

  status: "normal" | "warning" | "critical"
}

function SystemNode(props: SystemNodeProps) {

  const borderColor =
    props.status === "critical"
      ? "#ff4d4f"
      : props.status === "warning"
      ? "#faad14"
      : "#52c41a"

  return (

    <div
      style={{

        border: `2px solid ${borderColor}`,

        borderRadius: "12px",

        padding: "16px",

        marginBottom: "12px",

        background: "#111827",

        color: "#ffffff"
      }}
    >

      <div
        style={{

          fontSize: "12px",

          opacity: 0.8,

          marginBottom: "6px"
        }}
      >
        {props.title}
      </div>

      <div
        style={{

          fontSize: "24px",

          fontWeight: 700
        }}
      >
        {props.value}
      </div>
    </div>
  )
}

export default function InteractiveDigitalTwinPanel() {

  const [telemetry, setTelemetry] =
    useState<TelemetryState>({

      engineLoad: 0,

      coolantTemp: 0,

      batteryVoltage: 0,

      fuelLevel: 0
    })

  useEffect(() => {

    const interval =
      setInterval(() => {

        setTelemetry({

          engineLoad:
            Math.floor(
              Math.random() * 100
            ),

          coolantTemp:
            70 +
            Math.floor(
              Math.random() * 40
            ),

          batteryVoltage:
            Number(
              (
                12 +
                Math.random() * 2
              ).toFixed(1)
            ),

          fuelLevel:
            Math.floor(
              Math.random() * 100
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

        padding: "24px",

        background: "#0f172a",

        borderRadius: "16px"
      }}
    >

      <h2
        style={{

          color: "#ffffff",

          marginBottom: "20px"
        }}
      >
        Interactive Digital Twin
      </h2>

      <SystemNode
        title="ENGINE LOAD"
        value={`${telemetry.engineLoad}%`}
        status={
          telemetry.engineLoad > 80
            ? "warning"
            : "normal"
        }
      />

      <SystemNode
        title="COOLANT TEMP"
        value={`${telemetry.coolantTemp}°C`}
        status={
          telemetry.coolantTemp > 100
            ? "critical"
            : telemetry.coolantTemp > 90
            ? "warning"
            : "normal"
        }
      />

      <SystemNode
        title="BATTERY"
        value={`${telemetry.batteryVoltage}V`}
        status={
          telemetry.batteryVoltage < 11.8
            ? "critical"
            : "normal"
        }
      />

      <SystemNode
        title="FUEL LEVEL"
        value={`${telemetry.fuelLevel}%`}
        status={
          telemetry.fuelLevel < 15
            ? "warning"
            : "normal"
        }
      />
    </div>
  )
}