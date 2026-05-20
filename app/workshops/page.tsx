"use client";
import { useEffect, useState } from "react";

export default function Workshops(){

  const [workshops, setWorkshops] = useState<any[]>([])

  useEffect(()=>{
    fetch("/api/workshops")
      .then(r=>r.json())
      .then(d=>setWorkshops(d.data || []))
  },[])

  async function book(w:any){
    await fetch("/api/bookings",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        workshop_id: w.id,
        service: "Repair",
        date: new Date()
      })
    })

    alert("Booked")
  }

  return (
    <div style={{padding:"40px", background:"#000", color:"#fff"}}>

      <h2>Workshop Marketplace</h2>

      {workshops.map((w,i)=>(
        <div key={i} style={{
          background:"#111",
          padding:"15px",
          marginBottom:"10px"
        }}>
          <div>{w.name}</div>
          <div>{w.location}</div>
          <div>${w.hourly_rate}/hr</div>

          <button onClick={()=>book(w)}>
            Book Now
          </button>
        </div>
      ))}

    </div>
  )
}
