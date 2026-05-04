// =====================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\page.tsx
// Timestamp: 2026-05-04 21:50
// Purpose: Add service schedule + maintenance timeline UI
// =====================================================

"use client";
import { useState } from "react";

export default function Page() {

  const [vinInput, setVinInput] = useState("")
  const [vehicle, setVehicle] = useState<any>(null)
  const [results, setResults] = useState<any[]>([])
  const [debug, setDebug] = useState<any>(null)

  // -------------------------------
  // FETCH SUPPLIERS
  // -------------------------------
  async function fetchSuppliers(vehicle:any){

    const res = await fetch("/api/suppliers", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(vehicle)
    })

    const text = await res.text()
    if(!text || text.startsWith("<!DOCTYPE")) return

    const data = JSON.parse(text)

    setDebug(data.debug)

    if(data.success){
      setResults(data.results || [])
    }
  }

  // -------------------------------
  // ADD VIN
  // -------------------------------
  async function addVin(){

    const clean = vinInput.trim().toUpperCase()

    if(clean.length !== 17){
      alert("VIN must be 17 characters")
      return
    }

    const res = await fetch("/api/vin?vin=" + clean)
    const text = await res.text()

    if(!text) return alert("VIN failed")

    const data = JSON.parse(text)

    if(!data.success) return alert("Invalid VIN")

    const v = {
      vin: clean,
      model: data.model,
      engine: data.engine,
      year: data.year
    }

    setVehicle(v)
    await fetchSuppliers(v)
    setVinInput("")
  }

  // -------------------------------
  // BUILD TIMELINE
  // -------------------------------
  function buildTimeline(){

    const timeline:any[] = []

    results.forEach(r => {

      if(!r.prediction) return

      const risk = r.prediction.risk

      let priority = "LOW"
      let color = "#0af"

      if(risk > 0.8){
        priority = "URGENT"
        color = "#f00"
      } else if(risk > 0.5){
        priority = "SOON"
        color = "#fa0"
      }

      timeline.push({
        part: r.part,
        risk,
        priority,
        color
      })
    })

    return timeline.sort((a,b)=>b.risk - a.risk)
  }

  const timeline = buildTimeline()

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <div style={{padding:"40px", background:"#000", minHeight:"100vh"}}>

      <h2 style={{color:"#fff"}}>JustDefenders</h2>

      {/* VIN INPUT */}
      <div style={{marginBottom:"20px"}}>
        <input
          value={vinInput}
          onChange={(e)=>setVinInput(e.target.value.toUpperCase())}
          placeholder="Enter VIN"
        />
        <button onClick={addVin} style={{marginLeft:"10px"}}>
          Add VIN
        </button>
      </div>

      {/* VEHICLE */}
      {vehicle && (
        <div style={{color:"#fff", marginBottom:"20px"}}>
          {vehicle.model} {vehicle.engine} ({vehicle.year})
        </div>
      )}

      {/* ========================= */}
      {/* 🔥 SERVICE TIMELINE (NEW) */}
      {/* ========================= */}
      <div style={{marginBottom:"40px"}}>
        <h3 style={{color:"#fff"}}>Service Timeline</h3>

        {timeline.length === 0 && (
          <div style={{color:"#888"}}>No maintenance data yet</div>
        )}

        {timeline.map((t, i)=>(
          <div key={i} style={{
            padding:"12px",
            marginBottom:"10px",
            background:"#111",
            borderLeft:`4px solid ${t.color}`
          }}>
            <div style={{color:"#fff", fontWeight:"bold"}}>
              {t.part}
            </div>

            <div style={{color:t.color}}>
              {t.priority} — Risk {Math.round(t.risk * 100)}%
            </div>
          </div>
        ))}
      </div>

      {/* ========================= */}
      {/* RESULTS (UNCHANGED CORE) */}
      {/* ========================= */}
      <div style={{color:"#fff"}}>
        <h3>Parts</h3>

        {results.map((r:any, i:number)=>(
          <div key={i} style={{
            marginBottom:"20px",
            padding:"15px",
            background:"#111"
          }}>

            <div>{r.part}</div>

            {r.recommended && (
              <div style={{color:"#0f0"}}>
                🏆 ${r.recommended.price} ({r.recommended.supplier})
              </div>
            )}

            {r.prediction && (
              <div style={{color:"#f55", fontSize:"12px"}}>
                ⚠ {Math.round(r.prediction.risk * 100)}% risk
              </div>
            )}
          </div>
        ))}
      </div>

      {/* DEBUG */}
      <pre style={{color:"#0f0", fontSize:"12px"}}>
        {JSON.stringify(debug, null, 2)}
      </pre>

    </div>
  )
}