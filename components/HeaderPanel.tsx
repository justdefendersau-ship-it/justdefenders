"use client"

import { useState } from "react"

export default function HeaderPanel({ onSearch }) {

  const [query, setQuery] = useState("")
  const [vin, setVin] = useState("")
  const [vehicle, setVehicle] = useState(null)

  function handleSearch() {
    onSearch({ query, vin, vehicle })
  }

  function handleVinConfirm() {
    if (vin.length > 10) {
      // TEMP decode (real VIN decode comes next step)
      setVehicle({
        vin,
        model: "Defender",
        engine: "2.2 Tdci"
      })
    }
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-4">

      {/* SEARCH */}
      <div className="flex gap-2 mb-2">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Search part (e.g. starter motor)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded">
          Search
        </button>
      </div>

      {/* VIN */}
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Enter VIN"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
        />
        <button onClick={handleVinConfirm} className="px-4 py-2 bg-gray-800 text-white rounded">
          Add Vehicle
        </button>
      </div>

      {/* VEHICLE CHIP */}
      {vehicle && (
        <div className="mt-3 inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          ✔ {vehicle.model} {vehicle.engine} ({vehicle.vin.slice(-6)})
        </div>
      )}

    </div>
  )
}
