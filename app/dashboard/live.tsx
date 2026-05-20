"use client";
import { useEffect, useState } from "react";

export default function LiveDashboard(){

  const [data, setData] = useState<any[]>([])

  async function load(){
    const res = await fetch("/api/analytics")
    const json = await res.json()
    setData(json.variants || [])
  }

  useEffect(()=>{
    load()
    const i = setInterval(load, 3000)
    return ()=>clearInterval(i)
  },[])

  return (
    <div style={{padding:"20px"}}>

      <h2>Live Engine Metrics</h2>

      {data.map((v:any,i:number)=>(
        <div key={i}>

          <b>{v.name}</b>
          <div>Revenue: ${v.revenue}</div>
          <div>Conversions: {v.conversions}</div>

        </div>
      ))}

    </div>
  )
}
