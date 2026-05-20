"use client"

import React
from "react"

export default function EnterpriseDevSecOpsPanel(){

  return (

    <div className="jd-devsecops-shell">

      <div className="jd-devsecops-title">
        DEVSECOPS FEDERATION
      </div>

      <div className="jd-devsecops-card">
        <span>CI/CD Federation</span>
        <strong>ACTIVE</strong>
      </div>

      <div className="jd-devsecops-card">
        <span>Security Scanning</span>
        <strong>HEALTHY</strong>
      </div>

      <div className="jd-devsecops-card">
        <span>Supply Chain Integrity</span>
        <strong>VALIDATED</strong>
      </div>

      <div className="jd-devsecops-card">
        <span>Quality Gates</span>
        <strong>PASSED</strong>
      </div>

    </div>
  )
}
