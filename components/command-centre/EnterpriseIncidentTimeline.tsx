"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/EnterpriseIncidentTimeline.tsx

   Timestamp:
   14 May 2026 08:15 (Sydney)

   PURPOSE:
   Enterprise incident timeline replay
===================================================== */

import React,
{
  useEffect,
  useState
}
from "react"

export default function EnterpriseIncidentTimeline(){

  const [
    timeline,
    setTimeline
  ] = useState<any[]>([])

  useEffect(()=>{

    fetch(
      "/api/timeline"
    )
    .then(
      response=>response.json()
    )
    .then(
      data=>setTimeline(
        data.timeline
      )
    )

  },[])

  return (

    <div className="jd-timeline-shell">

      <div className="jd-timeline-title">

        INCIDENT TIMELINE

      </div>

      {

        timeline.map(
          (
            item,
            index
          )=>(

            <div
              key={index}
              className="jd-timeline-card"
            >

              <div>

                {item.event}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
