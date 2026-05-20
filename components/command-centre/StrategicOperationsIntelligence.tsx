"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/StrategicOperationsIntelligence.tsx

   Timestamp:
   14 May 2026 14:15 (Sydney)

   PURPOSE:
   Strategic operations intelligence console
===================================================== */

import React,
{
  useEffect,
  useState
}
from "react"

export default function StrategicOperationsIntelligence(){

  const [
    intelligence,
    setIntelligence
  ] = useState<any>(null)

  useEffect(()=>{

    fetch(
      "/api/strategic-intelligence"
    )
    .then(
      response=>response.json()
    )
    .then(
      data=>setIntelligence(data)
    )

  },[])

  if(
    !intelligence
  ){

    return null
  }

  return (

    <div className="jd-intelligence-shell">

      <div className="jd-intelligence-title">

        STRATEGIC AI INTELLIGENCE

      </div>

      <div className="jd-intelligence-card">

        <span>AI Agents</span>

        <strong>

          {intelligence.activeAgents}

        </strong>

      </div>

      <div className="jd-intelligence-card">

        <span>Orchestration</span>

        <strong>

          {intelligence.orchestration}

        </strong>

      </div>

      <div className="jd-intelligence-card">

        <span>Confidence</span>

        <strong>

          {intelligence.intelligenceConfidence}

        </strong>

      </div>

    </div>
  )
}
