"use client";
import { useEffect, useState } from "react";

export default function GraceBanner(){

  const [active, setActive] = useState(false)

  useEffect(()=>{
    fetch("/api/auth/gate")
      .then(r=>r.json())
      .then(d=>setActive(d.graceActive))
  },[])

  if(!active) return null

  return (
    <div style={{
      background:"#222",
      color:"#fff",
      padding:"10px",
      textAlign:"center"
    }}>
      Welcome — login not required during preview period
    </div>
  )
}
