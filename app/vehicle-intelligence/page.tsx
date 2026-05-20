"use client";

import {
  useState
} from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\vehicle-intelligence\page.tsx
//
// Timestamp:
// 2026-05-07 15:00
//
// Purpose:
// - Unified vehicle intelligence UI
// =====================================================

export default function VehicleIntelligencePage(){

  const [vin, setVin] =
    useState("")

  const [mileage, setMileage] =
    useState("")

  const [symptom, setSymptom] =
    useState("")

  const [dtc, setDtc] =
    useState("")

  const [results, setResults] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(false)

  // =====================================================
  // RUN
  // =====================================================

  async function run(){

    setLoading(true)

    const res =
      await fetch(
        "/api/vehicle-intelligence",
        {
          method:"POST",

          headers:{
            "Content-Type":
              "application/json"
          },

          body:JSON.stringify({

            vin,

            mileage,

            symptom,

            dtc
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
      maxWidth:"1100px",
      margin:"0 auto",
      padding:"20px",
      fontFamily:"Arial"
    }}>

      <h1>
        Unified Vehicle Intelligence
      </h1>

      {/* =====================================================
          INPUTS
      ===================================================== */}

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
          placeholder="Mileage"

          value={mileage}

          onChange={(e)=>{

            setMileage(
              e.target.value
            )
          }}

          style={{
            width:"100%",
            padding:"12px",
            marginBottom:"14px"
          }}
        />

        <textarea
          placeholder=
            "Describe symptoms..."

          value={symptom}

          onChange={(e)=>{

            setSymptom(
              e.target.value
            )
          }}

          style={{
            width:"100%",
            minHeight:"120px",
            padding:"12px",
            marginBottom:"14px"
          }}
        />

        <input
          placeholder=
            "Optional DTC"

          value={dtc}

          onChange={(e)=>{

            setDtc(
              e.target.value
            )
          }}

          style={{
            width:"100%",
            padding:"12px"
          }}
        />

        <button
          onClick={run}

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

          Run Unified Intelligence

        </button>

      </div>

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (

        <div style={{
          marginTop:"20px"
        }}>

          Running orchestration...

        </div>
      )}

      {/* =====================================================
          RESULTS
      ===================================================== */}

      {results?.intelligence && (

        <div style={{
          marginTop:"40px"
        }}>

          {/* =====================================================
              RISK
          ===================================================== */}

          <div style={{
            border:"1px solid #ddd",
            borderRadius:"10px",
            padding:"24px"
          }}>

            <div style={{
              fontSize:"28px",
              fontWeight:"bold"
            }}>

              Vehicle Intelligence Summary

            </div>

            <div style={{
              marginTop:"20px"
            }}>

              <b>Confidence:</b>
              {" "}
              {Math.round(
                results.intelligence.confidence * 100
              )}
              %

            </div>

            <div style={{
              marginTop:"10px"
            }}>

              <b>Risk Score:</b>
              {" "}
              {Math.round(
                results.intelligence.riskScore * 100
              )}
              %

            </div>

            <div style={{
              marginTop:"10px"
            }}>

              <b>Priority:</b>
              {" "}
              {results.intelligence.priority}

            </div>

          </div>

          {/* =====================================================
              ACTIONS
          ===================================================== */}

          {results.intelligence.actions?.length > 0 && (

            <div style={{
              marginTop:"30px",
              border:"1px solid #ddd",
              borderRadius:"10px",
              padding:"24px"
            }}>

              <div style={{
                fontSize:"24px",
                fontWeight:"bold"
              }}>

                Recommended Actions

              </div>

              {results.intelligence.actions.map(
                (a:string,idx:number)=>(

                  <div
                    key={idx}
                    style={{
                      marginTop:"10px"
                    }}
                  >

                    • {a}

                  </div>
                )
              )}

            </div>
          )}

          {/* =====================================================
              DIAGNOSTICS
          ===================================================== */}

          {results.intelligence.diagnosis?.length > 0 && (

            <div style={{
              marginTop:"30px",
              border:"1px solid #ddd",
              borderRadius:"10px",
              padding:"24px"
            }}>

              <div style={{
                fontSize:"24px",
                fontWeight:"bold"
              }}>

                Diagnostic Intelligence

              </div>

              {results.intelligence.diagnosis.map(
                (d:any,idx:number)=>(

                  <div
                    key={idx}
                    style={{
                      marginTop:"20px"
                    }}
                  >

                    <div style={{
                      fontWeight:"bold"
                    }}>

                      {d.probableCause}

                    </div>

                    <div style={{
                      marginTop:"8px"
                    }}>

                      Likelihood:
                      {" "}
                      {Math.round(
                        d.likelihood * 100
                      )}
                      %

                    </div>

                  </div>
                )
              )}

            </div>
          )}

          {/* =====================================================
              PREDICTIVE
          ===================================================== */}

          {results.intelligence.predictive?.length > 0 && (

            <div style={{
              marginTop:"30px",
              border:"1px solid #ddd",
              borderRadius:"10px",
              padding:"24px"
            }}>

              <div style={{
                fontSize:"24px",
                fontWeight:"bold"
              }}>

                Predictive Intelligence

              </div>

              {results.intelligence.predictive.map(
                (p:any,idx:number)=>(

                  <div
                    key={idx}
                    style={{
                      marginTop:"20px"
                    }}
                  >

                    <div style={{
                      fontWeight:"bold"
                    }}>

                      {p.title}

                    </div>

                    <div style={{
                      marginTop:"8px"
                    }}>

                      {p.description}

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>
      )}

    </div>
  )
}
