"use client";
import { useEffect, useState } from "react";

// =====================================================
// JustDefenders ©
// User account dashboard
// =====================================================

export default function Account(){

  const [data, setData] = useState<any[]>([])

  async function load(){
    const res = await fetch("/api/analytics")
    const json = await res.json()
    setData(json.variants || [])
  }

  useEffect(()=>{
    load()
  },[])

  return (
    <div style={{padding:"20px"}}>

      <h2>Your Activity</h2>

      {data.map((v:any,i:number)=>(
        <div key={i}>

          <b>{v.name}</b>
          <div>Conversions: {v.conversions}</div>
          <div>Revenue generated: {v.revenue}</div>

        </div>
      ))}

    </div>
  )
}
