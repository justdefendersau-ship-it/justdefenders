// =====================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\garage\page.tsx
// Timestamp: 2026-05-05 00:05
// Purpose: Garage + Timeline + Calendar Integration
// =====================================================

"use client";
import { useEffect, useState } from "react";

export default function Garage(){

  const [vehicles, setVehicles] = useState<any[]>([])
  const [vin, setVin] = useState("")
  const [km, setKm] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [timeline, setTimeline] = useState<any[]>([])
  const [activeVehicle, setActiveVehicle] = useState<any>(null)

  // -------------------------------
  // LOAD GARAGE
  // -------------------------------
  async function loadGarage(){
    const res = await fetch("/api/garage/list")
    const data = await res.json()
    if(data.success) setVehicles(data.vehicles)
  }

  useEffect(()=>{ loadGarage() },[])

  // -------------------------------
  // ADD VEHICLE
  // -------------------------------
  async function addVehicle(){

    await fetch("/api/garage/create",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ vin })
    })

    await loadGarage()
    setVin("")
  }

  // -------------------------------
  // UPDATE KM
  // -------------------------------
  async function updateKm(vehicleId:string){

    await fetch("/api/garage/odometer",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        vehicle_id: vehicleId,
        km: Number(km)
      })
    })

    setKm("")
    alert("KM updated")
  }

  // -------------------------------
  // ANALYSE VEHICLE
  // -------------------------------
  async function analyse(vehicle:any){

    setActiveVehicle(vehicle)

    const res = await fetch("/api/garage/analyse?id=" + vehicle.id)
    const data = await res.json()

    if(!data.success) return

    const results = data.results || []
    setResults(results)

    const timeline = results
      .filter((r:any)=>r.prediction)
      .map((r:any)=>{

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

        return {
          part: r.part,
          risk,
          priority,
          color,
          km: r.prediction.estimatedKm
        }
      })
      .sort((a:any,b:any)=>b.risk - a.risk)

    setTimeline(timeline)
  }

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <div style={{padding:"40px", background:"#000", color:"#fff"}}>

      <h2>Vehicle Garage</h2>

      {/* ADD VEHICLE */}
      <div style={{marginBottom:"20px"}}>
        <input
          value={vin}
          onChange={(e)=>setVin(e.target.value)}
          placeholder="VIN"
        />
        <button onClick={addVehicle} style={{marginLeft:"10px"}}>
          Add Vehicle
        </button>
      </div>

      {/* VEHICLES */}
      {vehicles.map(v=>(
        <div key={v.id} style={{
          padding:"15px",
          marginBottom:"15px",
          background:"#111",
          borderRadius:"6px"
        }}>

          <div style={{fontWeight:"bold"}}>
            {v.vin}
          </div>

          {/* KM */}
          <div style={{marginTop:"10px"}}>
            <input
              placeholder="KM"
              value={km}
              onChange={(e)=>setKm(e.target.value)}
            />
            <button onClick={()=>updateKm(v.id)} style={{marginLeft:"10px"}}>
              Update KM
            </button>
          </div>

          {/* ANALYSE */}
          <div style={{marginTop:"10px"}}>
            <button onClick={()=>analyse(v)}>
              Analyse Vehicle
            </button>
          </div>

        </div>
      ))}

      {/* ========================= */}
      {/* SERVICE TIMELINE */}
      {/* ========================= */}
      {timeline.length > 0 && activeVehicle && (
        <div style={{marginTop:"40px"}}>

          <h3>Service Timeline</h3>

          {timeline.map((t, i)=>(
            <div key={i} style={{
              padding:"12px",
              marginBottom:"10px",
              background:"#111",
              borderLeft:`4px solid ${t.color}`
            }}>

              <div style={{fontWeight:"bold"}}>
                {t.part}
              </div>

              <div style={{color:t.color}}>
                {t.priority} — Risk {Math.round(t.risk * 100)}%
              </div>

              <div style={{fontSize:"12px", color:"#888"}}>
                Expected at ~{t.km} km
              </div>

              {/* 📅 ADD TO CALENDAR */}
              <div style={{marginTop:"6px"}}>
                <a
                  href={`/api/garage/calendar?vehicle=${activeVehicle.model || activeVehicle.vin}&part=${t.part}&date=${new Date().toISOString()}`}
                  style={{fontSize:"12px", color:"#0af"}}
                >
                  📅 Add to Calendar
                </a>
              </div>

            </div>
          ))}

        </div>
      )}

      {/* RESULTS */}
      {results.length > 0 && (
        <div style={{marginTop:"40px"}}>

          <h3>Detailed Parts</h3>

          {results.map((r:any, i:number)=>(
            <div key={i} style={{
              padding:"12px",
              marginBottom:"10px",
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
      )}

    </div>
  )
}