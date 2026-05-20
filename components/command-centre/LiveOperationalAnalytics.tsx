"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/LiveOperationalAnalytics.tsx

   Timestamp:
   14 May 2026 10:15 (Sydney)

   PURPOSE:
   Live operational analytics dashboard
===================================================== */

import React,
{
  useEffect,
  useState
}
from "react"

export default function LiveOperationalAnalytics(){

  const [
    analytics,
    setAnalytics
  ] = useState<any>(null)

  useEffect(()=>{

    const load = ()=>{

      fetch(
        "/api/analytics"
      )
      .then(
        response=>response.json()
      )
      .then(
        data=>setAnalytics(data)
      )
    }

    load()

    const interval =
    setInterval(
      load,
      4000
    )

    return ()=>clearInterval(
      interval
    )

  },[])

  if(
    !analytics
  ){

    return null
  }

  return (

    <div className="jd-analytics-shell">

      <div className="jd-analytics-title">

        LIVE ANALYTICS

      </div>

      <div className="jd-analytics-grid">

        <div className="jd-analytics-card">

          <span>Federation</span>

          <strong>

            {analytics.federationHealth}

          </strong>

        </div>

        <div className="jd-analytics-card">

          <span>Threat Velocity</span>

          <strong>

            {analytics.threatVelocity}

          </strong>

        </div>

        <div className="jd-analytics-card">

          <span>Telemetry</span>

          <strong>

            {analytics.telemetryLoad}

          </strong>

        </div>

        <div className="jd-analytics-card">

          <span>Missions</span>

          <strong>

            {analytics.activeMissions}

          </strong>

        </div>

      </div>

    </div>
  )
}
