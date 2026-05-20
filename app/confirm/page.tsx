"use client";
import { useState } from "react";

export default function Confirm(){

  const [done,setDone] = useState(false)

  async function confirm(){

    const tracking_id = localStorage.getItem("jd_tracking_id")

    const res = await fetch("/api/confirm",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        tracking_id,
        supplier:"unknown",
        price:100
      })
    })

    const data = await res.json()
    setDone(true)

    alert("Revenue recorded: $" + data.revenue.toFixed(2))
  }

  return (
    <div style={{ padding:"40px", textAlign:"center" }}>
      <h2>Did you complete your purchase?</h2>

      {!done && (
        <button onClick={confirm}>
          Yes, I bought it
        </button>
      )}

      {done && <div>Thanks! Recorded.</div>}
    </div>
  )
}