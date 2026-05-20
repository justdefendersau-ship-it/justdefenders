"use client"

import React
from "react"

export default function EnterpriseSecurityOperationsPanel(){

  return (

    <div className="jd-security-shell">

      <div className="jd-security-title">
        SECURITY OPERATIONS FEDERATION
      </div>

      <div className="jd-security-card">
        <span>SIEM Federation</span>
        <strong>ACTIVE</strong>
      </div>

      <div className="jd-security-card">
        <span>Threat Intelligence</span>
        <strong>ELEVATED</strong>
      </div>

      <div className="jd-security-card">
        <span>Containment Runtime</span>
        <strong>ENABLED</strong>
      </div>

      <div className="jd-security-card">
        <span>MITRE Federation</span>
        <strong>ACTIVE</strong>
      </div>

    </div>
  )
}
