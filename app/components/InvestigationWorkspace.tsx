"use client"

import {
  useEffect,
  useState
}
from "react"

export default function InvestigationWorkspace(){

  const [alerts, setAlerts] =
  useState<any[]>([])

  async function load(){

    try {

      const response =
      await fetch(
        "/api/investigations/timeline"
      )

const data =
await response.json()

setAlerts(
  Array.isArray(data)
    ? data
    : data.alerts || []
)

    } catch(error){

      console.log(error)
    }
  }

  useEffect(() => {

    load()

  }, [])

  return (

    <div style={panel}>

      <h2 style={header}>

        Investigation Workspace

      </h2>

      {

        alerts.map(

          (alert:any,index:number) => (

            <div
              key={index}
              style={alertCard}
            >

              <div>

                <b>

                  {alert.title ||
                   "Alert"}

                </b>

              </div>

              <div>

                Severity:
                {" "}
                {alert.severity ||
                 "UNKNOWN"}

              </div>

            </div>
          ))
      }

    </div>
  )
}

const panel = {

  background:"#111",

  padding:"20px",

  borderRadius:"12px",

  marginTop:"20px"
}

const header = {

  color:"#00ff88"
}

const alertCard = {

  background:"#1b1b1b",

  padding:"14px",

  borderRadius:"10px",

  marginTop:"12px"
}