"use client"

import { useState } from "react"
import { decodeVIN } from "../lib/logic/vinDecoder"

export default function CommandHeader({ onSearch }) {

  const [query, setQuery] = useState("")
  const [vin, setVin] = useState("")
  const [vehicle, setVehicle] = useState(null)

  function handleAddVin() {
    if (vin.length < 10) return

    const decoded = decodeVIN(vin)
    setVehicle(decoded)
  }

  function handleClearVehicle() {
    setVehicle(null)
    setVin("")
  }

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6 rounded-xl shadow-xl text-white">

      <h1 className="text-2xl font-bold mb-4">
        JustDefenders Parts Intelligence
      </h1>

      {/* SEARCH */}
      <div className="flex gap-3 mb-3">
        <input
          className="flex-1 p-3 rounded-lg text-black"
          placeholder="Search parts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={() => onSearch(query, vehicle)}
          className="bg-blue-500 px-5 py-3 rounded-lg"
        >
          Search
        </button>
      </div>

      {/* VIN */}
      <div className="flex gap-3 mb-3">
        <input
          className="flex-1 p-3 rounded-lg text-black"
          placeholder="Enter VIN"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
        />

        <button
          onClick={handleAddVin}
          className="bg-green-600 px-4 py-3 rounded-lg"
        >
          + Add VIN
        </button>
      </div>

      {/* VEHICLE CHIP */}
      {vehicle && (
        <div className="flex items-center gap-3 bg-green-100 text-green-900 px-4 py-2 rounded-lg text-sm w-fit">

          <span>
            ✔ {vehicle.model} {vehicle.engine} ({vehicle.year})
          </span>

          <button
            onClick={handleClearVehicle}
            className="bg-green-300 hover:bg-green-400 text-black px-2 rounded"
          >
            ✕
          </button>

        </div>
      )}

      {/* FILTERS */}
      <div className="flex gap-2 mt-3">
        <button className="bg-white text-black px-4 py-1 rounded">OEM</button>
        <button className="bg-white text-black px-4 py-1 rounded">USED</button>
        <button className="bg-white text-black px-4 py-1 rounded">INTERNATIONAL</button>
      </div>

    </div>
  )
}
