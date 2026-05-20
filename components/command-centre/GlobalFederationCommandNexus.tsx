"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/GlobalFederationCommandNexus.tsx

   Timestamp:
   14 May 2026 22:15 (Sydney)

   PURPOSE:
   Global federation command nexus
===================================================== */

import React,
{
  useEffect,
  useState
}
from "react"

export default function GlobalFederationCommandNexus(){

  const [
    command,
    setCommand
  ] = useState<any>(null)

  useEffect(()=>{

    fetch(
      "/api/global-command"
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

    <div className="jd-global-shell">

      <div className="jd-global-title">

        GLOBAL COMMAND NEXUS

      </div>

      <div className="jd-global-card">

        <span>Status</span>

        <strong>

          {command.commandStatus}

        </strong>

      </div>

      <div className="jd-global-card">

        <span>Consensus</span>

        <strong>

          {command.consensus.federationConsensus}

        </strong>

      </div>

      <div className="jd-global-card">

        <span>Nodes</span>

        <strong>

          {command.consensus.participatingNodes}

        </strong>

      </div>

      <div className="jd-global-card">

        <span>Optimisation</span>

        <strong>

          {command.optimisation.optimisationLevel}

        </strong>

      </div>

    </div>
  )
}
