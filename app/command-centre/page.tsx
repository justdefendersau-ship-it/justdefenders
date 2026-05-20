"use client"

import KpiPanel
from "../../components/soc-dashboard/KpiPanel"

import AlertPanel
from "../../components/soc-dashboard/AlertPanel"

import TelemetryPanel
from "../../components/soc-dashboard/TelemetryPanel"

export default function CommandCentre(){

  return (

    <main className="min-h-screen p-8">

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          JustDefenders
        </h1>

        <div className="opacity-70">

          Executive Command Centre
        </div>

      </div>

      <div className="mb-8">

        <KpiPanel />

      </div>

      <div className="grid grid-cols-2 gap-6">

        <AlertPanel />

        <TelemetryPanel />

      </div>

    </main>
  )
}
