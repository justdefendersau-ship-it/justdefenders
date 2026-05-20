"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/UnifiedStrategicFederationConsole.tsx

   Timestamp:
   14 May 2026 20:15 (Sydney)

   PURPOSE:
   Unified strategic federation console
===================================================== */

import React,
{
  useEffect,
  useState
}
from "react"

export default function UnifiedStrategicFederationConsole(){

  const [
    federation,
    setFederation
  ] = useState<any>(null)

  useEffect(()=>{

    fetch(
      "/api/strategic-federation"
    )
    .then(
      response=>response.json()
    )
    .then(
      data=>setFederation(data)
    )

  },[])

  if(
    !federation
  ){

    return null
  }

  return (

    <div className="jd-federation-shell">

      <div className="jd-federation-title">

        STRATEGIC FEDERATION

      </div>

      <div className="jd-federation-card">

        <span>Status</span>

        <strong>

          {federation.federationStatus}

        </strong>

      </div>

      <div className="jd-federation-card">

        <span>Pacific</span>

        <strong>

          {federation.replication.pacific}

        </strong>

      </div>

      <div className="jd-federation-card">

        <span>Decision</span>

        <strong>

          {federation.decision.recommendedAction}

        </strong>

      </div>

      <div className="jd-federation-card">

        <span>Confidence</span>

        <strong>

          {federation.decision.confidence}

        </strong>

      </div>

    </div>
  )
}
