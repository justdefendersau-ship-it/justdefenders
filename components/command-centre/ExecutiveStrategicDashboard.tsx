"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/ExecutiveStrategicDashboard.tsx

   Timestamp:
   14 May 2026 16:15 (Sydney)

   PURPOSE:
   Executive strategic command dashboard
===================================================== */

import React,
{
  useEffect,
  useState
}
from "react"

export default function ExecutiveStrategicDashboard(){

  const [
    command,
    setCommand
  ] = useState<any>(null)

  useEffect(()=>{

    fetch(
      "/api/executive-command"
    )
    .then(
      response=>response.json()
    )
    .then(
      data=>setCommand(data)
    )

  },[])

  if(
    !command
  ){

    return null
  }

  return (

    <div className="jd-executive-shell">

      <div className="jd-executive-title">

        EXECUTIVE STRATEGIC COMMAND

      </div>

      <div className="jd-executive-card">

        <span>Region</span>

        <strong>

          {command.digitalTwin.region}

        </strong>

      </div>

      <div className="jd-executive-card">

        <span>Operational Load</span>

        <strong>

          {command.digitalTwin.operationalLoad}

        </strong>

      </div>

      <div className="jd-executive-card">

        <span>Simulation Confidence</span>

        <strong>

          {command.simulation.simulationConfidence}

        </strong>

      </div>

      <div className="jd-executive-card">

        <span>Strategic Status</span>

        <strong>

          {command.strategicStatus}

        </strong>

      </div>

    </div>
  )
}
