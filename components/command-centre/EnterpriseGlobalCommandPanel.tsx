"use client"

import React
from "react"

export default function EnterpriseGlobalCommandPanel(){

  return (

    <div className="jd-command-shell">

      <div className="jd-command-title">
        GLOBAL COMMAND FEDERATION
      </div>

      <div className="jd-command-card">
        <span>Digital Twin Runtime</span>
        <strong>ACTIVE</strong>
      </div>

      <div className="jd-command-card">
        <span>Simulation Engine</span>
        <strong>LIVE</strong>
      </div>

      <div className="jd-command-card">
        <span>Mission Synchronisation</span>
        <strong>ONLINE</strong>
      </div>

      <div className="jd-command-card">
        <span>Global Command</span>
        <strong>OPERATIONAL</strong>
      </div>

    </div>
  )
}
