"use client";

import {
  useState
} from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\realtime\page.tsx
//
// Timestamp:
// 2026-05-07 18:00
//
// Purpose:
// - Real-time vehicle intelligence UI
// =====================================================

export default function RealtimePage(){

  const [vin, setVin] =
    useState("")

  const [coolantTemp, setCoolantTemp] =
    useState("")

  const [batteryVoltage, setBatteryVoltage] =
    useState("")

  const [boost, setBoost] =
    useState("")

  const [results, setResults] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(false)

  // =====================================================
  // RUN
  // =====================================================

  async function analyse(){

    setLoading(true)

    const res =
      await fetch(
        "/api/realtime",
        {
          method:"POST",

          headers:{
            "Content-Type":
              "application/json"
          },

          body:JSON.stringify({

            vin,

            telemetry:{

              coolantTemp:
                Number(coolantTemp),

              batteryVoltage:
                Number(batteryVoltage),

              boost:
                Number(boost)
            }
          })
        }
      )

    const data =
      await res.json()

    setResults(data)

    setLoading(false)
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div style={{
      maxWidth:"1000px",
      margin:"0 auto",
      padding:"20px",
      fontFamily:"Arial"
    }}>

      <h1>
        Real-Time Vehicle Intelligence
      </h1>

      <div style={{
        marginTop:"30px"
      }}>

        <input
          placeholder="VIN"

          value={vin}

          onChange={(e)=>{

            setVin(
              e.target.value
            )
          }}

          style={{
            width:"100%",
            padding:"12px",
            marginBottom:"14px"
          }}
        />

        <input
          placeholder="Coolant Temp"

          value={coolantTemp}

          onChange={(e)=>{

            setCoolantTemp(
              e.target.value
            )
          }}

          style={{
            width:"100%",
            padding:"12px",
            marginBottom:"14px"
          }}
        />

        <input
          placeholder="Battery Voltage"

          value={batteryVoltage}

          onChange={(e)=>{

            setBatteryVoltage(
              e.target.value
            )
          }}

          style={{
            width:"100%",
            padding:"12px",
            marginBottom:"14px"
          }}
        />

        <input
          placeholder="Boost Pressure"

          value={boost}

          onChange={(e)=>{

            setBoost(
              e.target.value
            )
          }}

          style={{
            width:"100%",
            padding:"12px"
          }}
        />

        <button
          onClick={analyse}

          style={{
            marginTop:"20px",
            padding:"12px 18px",
            background:"#0070f3",
            color:"#fff",
            border:"none",
            borderRadius:"6px",
            cursor:"pointer"
          }}
        >

          Analyse Vehicle State

        </button>

      </div>

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (

        <div style={{
          marginTop:"20px"
        }}>

          Analysing telemetry...

        </div>
      )}

      {/* =====================================================
          ALERTS
      ===================================================== */}

      {results?.alerts?.length > 0 && (

        <div style={{
          marginTop:"40px"
        }}>

          <h2>
            Vehicle Alerts
          </h2>

          {results.alerts.map(
            (a:any,idx:number)=>(

              <div
                key={idx}

                style={{
                  border:"1px solid #ddd",
                  borderRadius:"10px",
                  padding:"20px",
                  marginTop:"20px"
                }}
              >

                <div style={{
                  fontSize:"22px",
                  fontWeight:"bold"
                }}>

                  {a.title}

                </div>

                <div style={{
                  marginTop:"12px"
                }}>

                  {a.recommendation}

                </div>

                <div style={{
                  marginTop:"12px"
                }}>

                  <b>Severity:</b>
                  {" "}
                  {a.severity}

                </div>

              </div>
            )
          )}

        </div>
      )}

      {/* =====================================================
          FIELD
      ===================================================== */}

      {results?.fieldAdvice?.length > 0 && (

        <div style={{
          marginTop:"40px"
        }}>

          <h2>
            Field Assistance
          </h2>

          {results.fieldAdvice.map(
            (f:any,idx:number)=>(

              <div
                key={idx}

                style={{
                  border:"1px solid #ddd",
                  borderRadius:"10px",
                  padding:"20px",
                  marginTop:"20px"
                }}
              >

                <div style={{
                  fontSize:"22px",
                  fontWeight:"bold"
                }}>

                  {f.title}

                </div>

                <div style={{
                  marginTop:"12px"
                }}>

                  {f.guidance}

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  )
}
