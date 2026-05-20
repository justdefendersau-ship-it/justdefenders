"use client";
import { useEffect, useState } from "react";

export default function UserComms(){

  const [grace, setGrace] = useState(false)

  useEffect(()=>{
    fetch("/api/auth/gate")
      .then(r=>r.json())
      .then(d=>setGrace(d.graceActive))
  },[])

  if(!grace) return null

  return (
    <div>

      {/* TOP BANNER */}
      <div style={{
        background:"#111",
        color:"#fff",
        padding:"10px",
        textAlign:"center"
      }}>
        Preview mode: No login required. Save your results before access is restricted.
      </div>

    </div>
  )
}