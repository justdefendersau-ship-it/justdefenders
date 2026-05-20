// =====================================================
// JustDefenders Â©
// File: C:\dev\justdefenders\frontend\app\garage\notifications\page.tsx
// Timestamp: 2026-05-04 23:15
// Purpose: Notifications Panel + Alert Centre UI
// =====================================================

"use client";
import { useEffect, useState } from "react";

export default function Notifications(){

  const [alerts, setAlerts] = useState<any[]>([])
  const [filter, setFilter] = useState("ALL")

  // -------------------------------
  // LOAD ALERTS
  // -------------------------------
  async function loadAlerts(){

    const res = await fetch("/api/garage/alerts")
    const data = await res.json()

    if(data.success){
      setAlerts(data.alerts || [])
    }
  }

  useEffect(()=>{
    loadAlerts()
  },[])

  // -------------------------------
  // MARK AS READ
  // -------------------------------
  async function markRead(id:string){

    await fetch("/api/garage/alerts",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ id })
    })

    loadAlerts()
  }

  // -------------------------------
  // FILTER
  // -------------------------------
  const filtered = alerts.filter(a=>{
    if(filter === "ALL") return true
    return a.priority === filter.toLowerCase()
  })

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <div style={{padding:"40px", background:"#000", color:"#fff"}}>

      <h2>Alert Centre</h2>

      {/* FILTER */}
      <div style={{marginBottom:"20px"}}>
        <button onClick={()=>setFilter("ALL")}>All</button>
        <button onClick={()=>setFilter("HIGH")} style={{marginLeft:"10px"}}>High</button>
        <button onClick={()=>setFilter("MEDIUM")} style={{marginLeft:"10px"}}>Medium</button>
      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (
        <div style={{color:"#888"}}>
          No alerts
        </div>
      )}

      {/* ALERT LIST */}
      {filtered.map((a)=>{

        let color = "#0af"
        if(a.priority === "high") color = "#f00"
        if(a.priority === "medium") color = "#fa0"

        return (
          <div key={a.id} style={{
            padding:"15px",
            marginBottom:"10px",
            background:"#111",
            borderLeft:`4px solid ${color}`,
            opacity: a.triggered ? 0.5 : 1
          }}>

            <div style={{fontWeight:"bold"}}>
              {a.message}
            </div>

            <div style={{fontSize:"12px", color:"#888"}}>
              {new Date(a.created_at).toLocaleString()}
            </div>

            {/* ACTION */}
            {!a.triggered && (
              <button
                onClick={()=>markRead(a.id)}
                style={{marginTop:"10px"}}
              >
                Mark as done
              </button>
            )}

          </div>
        )
      })}

    </div>
  )
}