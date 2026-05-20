"use client"

import {
  useLiveTelemetry
}
from "../../hooks/useLiveTelemetry"

export default function TelemetryPanel(){

  const telemetry =
  useLiveTelemetry()

  return (

    <div className="rounded-2xl border p-4">

      <h2 className="text-xl font-bold mb-4">

        Live Telemetry

      </h2>

      <div className="space-y-2">

        {telemetry.map((item,index) => (

          <div
            key={index}
            className="text-sm border-b pb-2"
          >

            {JSON.stringify(item)}
          </div>
        ))}

      </div>

    </div>
  )
}
