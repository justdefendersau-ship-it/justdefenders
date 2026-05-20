"use client"

export default function KpiPanel(){

  const metrics = [

    {

      label:"Active Incidents",

      value:"6"
    },

    {

      label:"Telemetry Streams",

      value:"42"
    },

    {

      label:"Operational Health",

      value:"97%"
    },

    {

      label:"Threat Score",

      value:"LOW"
    }
  ]

  return (

    <div className="grid grid-cols-2 gap-4">

      {metrics.map((metric,index) => (

        <div
          key={index}
          className="rounded-2xl border p-4"
        >

          <div className="text-sm opacity-70">

            {metric.label}

          </div>

          <div className="text-2xl font-bold">

            {metric.value}

          </div>

        </div>
      ))}

    </div>
  )
}
