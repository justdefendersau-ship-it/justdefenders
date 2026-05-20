// JustDefenders ©
// File: C:\dev\justdefenders\frontend\components\CommandHeader.tsx
// Timestamp: 14 May 2026 21:40 Sydney

"use client"

import React, {
  useState
} from "react"

import {
  decodeVIN
} from "../lib/logic/vinDecoder"

interface CommandHeaderProps {
  onSearch: (
    query: string,
    vin: string
  ) => void
}

export default function CommandHeader({
  onSearch
}: CommandHeaderProps) {

  const [query, setQuery] =
    useState<string>("")

  const [vin, setVin] =
    useState<string>("")

  function handleSearch():
  void {

    /**
     * Trigger VIN decode
     */
    if (vin.trim()) {

      try {

        decodeVIN(vin)

      } catch (err) {

        console.error(
          "VIN decode failed",
          err
        )
      }
    }

    onSearch(
      query.trim(),
      vin.trim()
    )
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

      <h1
        style={{
          color: "#ffffff",
          marginTop: 0,
          marginBottom: "20px",
          fontSize: "32px",
          fontWeight: 800
        }}
      >
        Command Centre
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr auto",
          gap: "12px"
        }}
      >

        <input
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
          placeholder="Search intelligence..."
          style={{
            padding: "14px",
            borderRadius: "12px",
            border:
              "1px solid #334155",
            background: "#111827",
            color: "#ffffff"
          }}
        />

        <input
          value={vin}
          onChange={(e) =>
            setVin(
              e.target.value
            )
          }
          placeholder="Enter VIN"
          style={{
            padding: "14px",
            borderRadius: "12px",
            border:
              "1px solid #334155",
            background: "#111827",
            color: "#ffffff"
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            padding: "14px 18px",
            cursor: "pointer",
            fontWeight: 700
          }}
        >
          Search
        </button>

      </div>

    </div>

  )
}