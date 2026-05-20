// =====================================================
// JustDefenders Â©
// Fuel UI + diagnostics + parts recommendations
// =====================================================

"use client";
import { useState, useEffect } from "react";

export default function FuelEntry({ vehicleId }:{ vehicleId:string }){

  const [litres, setLitres] = useState("")
  const [odo, setOdo] = useState("")
  const [price, setPrice] = useState("")
  const [sources, setSources] = useState<any[]>([])
  const [sourceId, setSourceId] = useState("")
  const [diagnosis, setDiagnosis] = useState<any>(null)

  useEffect(()=>{ loadSources() },[])

  async function loadSources(){
    const res = await fetch("/api/fuel-sources")
    const data = await res.json()
    setSources(data || [])
  }

  async function submit(){

    let latitude: any = null
    let longitude: any = null

    if(navigator.geolocation){
      await new Promise((resolve)=>{
        navigator.geolocation.getCurrentPosition((pos)=>{
          latitude = pos.coords.latitude
          longitude = pos.coords.longitude
          resolve(true)
        },()=>resolve(true))
      })
    }

    // save fuel
    await fetch("/api/garage/fuel",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        vehicle_id: vehicleId,
        litres: Number(litres),
        odometer: Number(odo),
        price_per_litre: Number(price),
        latitude,
        longitude,
        fuel_source_id: sourceId
      })
    })

    // run diagnostics
    const res = await fetch("/api/garage/diagnostics",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ vehicle_id: vehicleId })
    })

    const data = await res.json()
    setDiagnosis(data)

    setLitres("")
    setOdo("")
    setPrice("")
    setSourceId("")
  }

  return (
    <div style={{marginTop:"10px"}}>

      <input placeholder="Litres" value={litres} onChange={e=>setLitres(e.target.value)} />
      <input placeholder="Odometer" value={odo} onChange={e=>setOdo(e.target.value)} />
      <input placeholder="Price/L" value={price} onChange={e=>setPrice(e.target.value)} />

      <select value={sourceId} onChange={e=>setSourceId(e.target.value)}>
        <option value="">Select source</option>
        {sources.map((s)=>(
          <option key={s.id} value={s.id}>
            {s.source_type}
          </option>
        ))}
      </select>

      <button onClick={submit}>Add Fuel</button>

      {/* ========================= */}
      {/* ðŸ”¥ DIAGNOSTIC + PARTS UI */}
      {/* ========================= */}
      {diagnosis?.success && (
        <div style={{marginTop:"15px", padding:"10px", background:"#111"}}>

          <div style={{color:"#f90"}}>
            âš  {diagnosis.message} ({Math.round(diagnosis.confidence*100)}%)
          </div>

          <div style={{marginTop:"10px"}}>
            <strong>Recommended Fix:</strong>
          </div>

          {diagnosis.recommendations?.map((r:any,i:number)=>(
            <div key={i} style={{marginTop:"8px"}}>

              <div>{r.part}</div>

              <div style={{fontSize:"12px", color:"#0f0"}}>
                Best: {r.cheapest?.supplier} â€” ${r.cheapest?.price}
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}