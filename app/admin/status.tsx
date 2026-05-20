"use client";
import { useEffect, useState } from "react";

// =====================================================
// JustDefenders Â©
// File: app/admin/status.tsx
// Timestamp: 2026-05-06 10:40
// Purpose: Live system metrics
// =====================================================

export default function Status(){

  const [data, setData] = useState<any>(null)

  async function load(){
    const res = await fetch("/api/analytics")
    const json = await res.json()
    setData(json)
  }

  useEffect(()=>{
    load()
    const i = setInterval(load, 3000)
    return ()=>clearInterval(i)
  },[])

  if(!data){
    return <div>Loading...</div>
  }

  return (
    <div style={{marginTop:"30px"}}>

      <h2>Live Metrics</h2>

      {data.variants?.map((v:any,i:number)=>(
        <div key={i}>

          <b>{v.name}</b>
          <div>Revenue: {v.revenue}</div>
          <div>Clicks: {v.clicks}</div>
          <div>Conversions: {v.conversions}</div>

        </div>
      ))}

    </div>
  )
}