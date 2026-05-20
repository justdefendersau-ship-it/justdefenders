// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\components\VinManager.tsx
// Timestamp: 14 May 2026 18:30 Sydney

"use client"

import React, {
  useState
} from "react"

interface VinManagerProps {
  activeVin: string
  setActiveVin: (
    vin: string
  ) => void
}

export default function VinManager({
  activeVin,
  setActiveVin
}: VinManagerProps) {

  const [inputVin, setInputVin] =
    useState<string>("")

  const [vinList, setVinList] =
    useState<string[]>([])

  function addVin(): void {

    const trimmedVin =
      inputVin.trim()

    if (!trimmedVin) {
      return
    }

    if (
      vinList.includes(trimmedVin)
    ) {
      return
    }

    setVinList([
      ...vinList,
      trimmedVin
    ])

    setActiveVin(trimmedVin)

    setInputVin("")
  }

  return (

    <div
      style={{
        background: "#0f172a",
        borderRadius: "18px",
        padding: "24px",
        border:
          "1px solid rgba(255,255,255,0.08)"
      }}
    >

      <h2
        style={{
          color: "#ffffff",
          marginTop: 0,
          marginBottom: "18px"
        }}
      >
        VIN Manager
      </h2>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "18px"
        }}
      >

        <input
          value={inputVin}
          onChange={(e) =>
            setInputVin(
              e.target.value
            )
          }
          placeholder="Enter VIN"
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border:
              "1px solid #334155",
            background: "#111827",
            color: "#ffffff"
          }}
        />

        <button
          onClick={addVin}
          style={{
            background: "#16a34a",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            padding: "12px 18px",
            cursor: "pointer",
            fontWeight: 700
          }}
        >
          Add VIN
        </button>

      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px"
        }}
      >

        {vinList.map(
          (
            vin: string,
            idx: number
          ) => (

            <button
              key={idx}
              onClick={() =>
                setActiveVin(vin)
              }
              style={{
                background:
                  activeVin === vin
                    ? "#2563eb"
                    : "#1e293b",

                color: "#ffffff",

                border: "none",

                borderRadius: "999px",

                padding:
                  "8px 14px",

                cursor: "pointer",

                fontSize: "12px",

                fontWeight: 600
              }}
            >
              {vin}
            </button>

          )
        )}

      </div>

    </div>

  )
}