"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/SupremeCyberDefenceCommandNexus.tsx

   Timestamp:
   15 May 2026 04:15 (Sydney)

   PURPOSE:
   Supreme cyber defence command nexus
===================================================== */

import React,
{
  useEffect,
  useState
}
from "react"

export default function SupremeCyberDefenceCommandNexus(){

  const [
    cyber,
    setCyber
  ] = useState<any>(null)

  useEffect(()=>{

    fetch(
      "/api/cyber-command"
    )
    .then(
      response=>response.json()
    )
    .then(
      data=>setCyber(data)
    )

  },[])

  if(
    !cyber
  ){

    return null
  }

  return (

    <div className="jd-cyber-shell">

      <div className="jd-cyber-title">

        CYBER DEFENCE COMMAND

      </div>

      <div className="jd-cyber-card">

        <span>Cyber Mesh</span>

        <strong>

          {cyber.cyber.meshStatus}

        </strong>

      </div>

      <div className="jd-cyber-card">

        <span>Resilience</span>

        <strong>

          {cyber.resilience.resilienceState}

        </strong>

      </div>

      <div className="jd-cyber-card">

        <span>Threat Exposure</span>

        <strong>

          {cyber.resilience.projectedThreatExposure}

        </strong>

      </div>

      <div className="jd-cyber-card">

        <span>Command</span>

        <strong>

          {cyber.cyberCommand}

        </strong>

      </div>

    </div>
  )
}
