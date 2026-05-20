"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/CognitiveStrategicOperations.tsx

   Timestamp:
   14 May 2026 18:15 (Sydney)

   PURPOSE:
   Cognitive strategic operations console
===================================================== */

import React,
{
  useEffect,
  useState
}
from "react"

export default function CognitiveStrategicOperations(){

  const [
    cognition,
    setCognition
  ] = useState<any>(null)

  useEffect(()=>{

    fetch(
      "/api/cognitive-intelligence"
    )
    .then(
      response=>response.json()
    )
    .then(
      data=>setCognition(data)
    )

  },[])

  if(
    !cognition
  ){

    return null
  }

  return (

    <div className="jd-cognitive-shell">

      <div className="jd-cognitive-title">

        COGNITIVE OPERATIONS

      </div>

      <div className="jd-cognitive-card">

        <span>AI Swarm</span>

        <strong>

          {cognition.swarm.swarmStatus}

        </strong>

      </div>

      <div className="jd-cognitive-card">

        <span>Agents</span>

        <strong>

          {cognition.swarm.activeAgents}

        </strong>

      </div>

      <div className="jd-cognitive-card">

        <span>Prompt Chains</span>

        <strong>

          {cognition.prompts.promptChains}

        </strong>

      </div>

      <div className="jd-cognitive-card">

        <span>Cognition</span>

        <strong>

          {cognition.cognition}

        </strong>

      </div>

    </div>
  )
}
