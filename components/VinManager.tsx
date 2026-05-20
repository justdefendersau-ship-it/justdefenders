// JustDefenders ©
// File: C:\dev\justdefenders\frontend\components\VinManager.tsx
// Timestamp: 14 May 2026 13:45 Sydney

"use client"

import React, {
  useState
} from "react"

interface VinManagerProps {
  activeVin?: string
  setActiveVin: (vin: string) => void
}

export default function VinManager({
  activeVin,
  setActiveVin
}: VinManagerProps) {

  const [inputVin, setInputVin] = useState<string>("")

  const [vinList, setVinList] = useState<string[]>([])

  function addVin(): void {

    const trimmedVin = inputVin.trim()

    if (!trimmedVin) {
      return
    }

    if (vinList.includes(trimmedVin)) {
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
        marginBottom: "20px"
      }}
    >

      <input
        value={inputVin}
        onChange={(e) => setInputVin(e.target.value)}
        placeholder="Enter VIN"
        style={{
          padding: "8px",
          marginRight: "10px",
          width: "260px",
          borderRadius: "8px",
          border: "1px solid #cbd5e1"
        }}
      />

      <button
        onClick={addVin}
        style={{
          background: "#16a34a",
          color: "#ffffff",
          padding: "8px 12px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontWeight: 600
        }}
      >
        + Add VIN
      </button>

      <div
        style={{
          marginTop: "10px"
        }}
      >

        {vinList.map(
          (
            vin: string,
            idx: number
          ) => (

            <span
              key={idx}
              onClick={() => setActiveVin(vin)}
              style={{
                display: "inline-block",
                background:
                  activeVin === vin
                    ? "#16a34a"
                    : "#e5e7eb",

                color:
                  activeVin === vin
                    ? "#ffffff"
                    : "#333333",

                padding: "4px 10px",
                borderRadius: "20px",
                marginRight: "6px",
                marginBottom: "6px",
                fontSize: "12px",
                cursor: "pointer"
              }}
            >
              {vin}
            </span>

          )
        )}

      </div>

    </div>

  )
}