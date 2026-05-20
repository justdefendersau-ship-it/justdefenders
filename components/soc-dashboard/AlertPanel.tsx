"use client"

export default function AlertPanel(){

  const alerts = [

    {

      severity:"HIGH",

      message:"Suspicious login detected"
    },

    {

      severity:"MEDIUM",

      message:"Telemetry spike observed"
    }
  ]

  return (

    <div className="rounded-2xl border p-4">

      <h2 className="text-xl font-bold mb-4">

        Live Alerts

      </h2>

      <div className="space-y-3">

        {alerts.map((alert,index) => (

          <div
            key={index}
            className="border rounded-xl p-3"
          >

            <div className="font-semibold">

              {alert.severity}

            </div>

            <div className="text-sm opacity-80">

              {alert.message}

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}
