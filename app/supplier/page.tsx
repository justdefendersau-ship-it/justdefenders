"use client";
import { useEffect, useState } from "react";

export default function Supplier(){

  const [allowed, setAllowed] = useState(false)

  useEffect(()=>{
    async function check(){

      const gate = await fetch("/api/auth/gate").then(r=>r.json())

      if(gate.graceActive){
        setAllowed(true)
        return
      }

      window.location.href = "/login"
    }

    check()
  },[])

  if(!allowed){
    return <div>Checking access...</div>
  }

  return (
    <div style={{padding:"20px"}}>
      <h2>Supplier Portal</h2>
    </div>
  )
}