"use client"

import SOCNavigation
from "../components/SOCNavigation"

import ExecutiveDashboard
from "../components/ExecutiveDashboard"

import InvestigationWorkspace
from "../components/InvestigationWorkspace"

export default function Workspace(){

  return (

    <div style={shell}>

      <SOCNavigation />

      <main style={main}>

        <h1 style={header}>

          Unified SOC Command Centre

        </h1>

        <ExecutiveDashboard />

        <InvestigationWorkspace />

      </main>

    </div>
  )
}

const shell = {

  display:"flex",

  background:"#050505",

  color:"#fff",

  minHeight:"100vh"
}

const main = {

  flex:1,

  padding:"20px"
}

const header = {

  color:"#00ff88"
}