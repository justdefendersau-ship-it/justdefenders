"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/UnifiedImmersiveCommandCentre.tsx

   Timestamp:
   15 May 2026 04:15 (Sydney)

   PURPOSE:
   Autonomous cyber defence federation platform
===================================================== */

import React
from "react"

import {
  motion
}
from "framer-motion"

import True3DOperationsMap
from "../operations-map/True3DOperationsMap"

import RealMissionStatusPanel
from "./RealMissionStatusPanel"

import EnterpriseObservabilityDashboard
from "./EnterpriseObservabilityDashboard"

import EnterpriseIncidentTimeline
from "./EnterpriseIncidentTimeline"

import LiveOperationalAnalytics
from "./LiveOperationalAnalytics"

import InfrastructureHealthConsole
from "./InfrastructureHealthConsole"

import StrategicOperationsIntelligence
from "./StrategicOperationsIntelligence"

import ExecutiveStrategicDashboard
from "./ExecutiveStrategicDashboard"

import CognitiveStrategicOperations
from "./CognitiveStrategicOperations"

import UnifiedStrategicFederationConsole
from "./UnifiedStrategicFederationConsole"

import GlobalFederationCommandNexus
from "./GlobalFederationCommandNexus"

import SupremeStrategicOperationsNexus
from "./SupremeStrategicOperationsNexus"

import SupremeFederationGovernanceNexus
from "./SupremeFederationGovernanceNexus"

import SupremeCyberDefenceCommandNexus
from "./SupremeCyberDefenceCommandNexus"

export default function UnifiedImmersiveCommandCentre(){

  return (

    <div className="jd-shell-phase46">

      <motion.div

        initial={{
          opacity:0
        }}

        animate={{
          opacity:1
        }}

        transition={{
          duration:1
        }}

        className="jd-header-phase46"
      >

        <div className="jd-title-phase46">

          JUSTDEFENDERS

        </div>

        <div className="jd-subtitle-phase46">

          Autonomous Cyber Defence Federation Platform

        </div>

      </motion.div>

      <div className="jd-layout-phase46">

        <div className="jd-map-phase46">

          <True3DOperationsMap />

        </div>

        <div className="jd-sidebar-phase46">

          <RealMissionStatusPanel />

          <EnterpriseObservabilityDashboard />

          <EnterpriseIncidentTimeline />

          <LiveOperationalAnalytics />

          <InfrastructureHealthConsole />

          <StrategicOperationsIntelligence />

          <ExecutiveStrategicDashboard />

          <CognitiveStrategicOperations />

          <UnifiedStrategicFederationConsole />

          <GlobalFederationCommandNexus />

          <SupremeStrategicOperationsNexus />

          <SupremeFederationGovernanceNexus />

          <SupremeCyberDefenceCommandNexus />

        </div>

      </div>

    </div>
  )
}
