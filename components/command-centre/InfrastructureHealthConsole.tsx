"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/InfrastructureHealthConsole.tsx

   Timestamp:
   14 May 2026 12:15 (Sydney)

   PURPOSE:
   Production infrastructure health console
===================================================== */

import React,
{
  useEffect,
  useState
}
from "react"

export default function InfrastructureHealthConsole(){

  const [
    health,
    setHealth
  ] = useState<any>(null)

  useEffect(()=>{

    fetch(
      "/api/infrastructure-health"
    )
    .then(
      response=>response.json()
    )
    .then(
      data=>setHealth(data)
    )

  },[])

  if(
    !health
  ){

    return null
  }

  return (

    <div className="jd-health-shell">

      <div className="jd-health-title">

        INFRASTRUCTURE HEALTH

      </div>

      {

        Object.entries(
          health
        ).map(
          (
            [key,value],
            index
          )=>(

            <div
              key={index}
              className="jd-health-card"
            >

              <span>

                {key}

              </span>

              <strong>

                {String(value)}

              </strong>

            </div>
          )
        )
      }

    </div>
  )
}
