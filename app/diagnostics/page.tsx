"use client";

import {
  useState
} from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\diagnostics\page.tsx
//
// Timestamp:
// 2026-05-07 14:00
//
// Purpose:
// - Adaptive diagnostic intelligence UI
// =====================================================

export default function DiagnosticsPage(){

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

  async function runDiagnostics(){

    setLoading(true)

    const res =
      await fetch(
        "/api/diagnostics",
        {
          method:"POST",

          headers:{
            "Content-Type":
              "application/json"
          },

          body:JSON.stringify({

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
      maxWidth:"1000px",
      margin:"0 auto",
      padding:"20px",
      fontFamily:"Arial"
    }}>

      <h1>
        Adaptive Diagnostic Intelligence
      </h1>

      {/* =====================================================
          INPUTS
      ===================================================== */}

      <div style={{
        marginTop:"30px"
      }}>

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
            minHeight:"140px",
            padding:"12px"
          }}
        />

        <input
          placeholder=
            "Optional OBD fault code (Pxxxx)"

          value={dtc}

          onChange={(e)=>{

            setDtc(
              e.target.value
            )
          }}

          style={{
            width:"100%",
            marginTop:"14px",
            padding:"12px"
          }}
        />

        <button
          onClick={runDiagnostics}

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

          Run Diagnostics

        </button>

      </div>

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (

        <div style={{
          marginTop:"20px"
        }}>

          Running diagnostics...

        </div>
      )}

      {/* =====================================================
          RESULTS
      ===================================================== */}

      {results?.diagnosis?.length > 0 && (

        <div style={{
          marginTop:"40px"
        }}>

          <h2>
            Probable Causes
          </h2>

          {results.diagnosis.map(
            (d:any,idx:number)=>(

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

                  {d.probableCause}

                </div>

                <div style={{
                  marginTop:"10px"
                }}>

                  Likelihood:
                  {" "}
                  {Math.round(
                    d.likelihood * 100
                  )}
                  %

                </div>

                <div style={{
                  marginTop:"8px"
                }}>

                  <b>Urgency:</b>
                  {" "}
                  {d.urgency}

                  {" • "}

                  <b>Difficulty:</b>
                  {" "}
                  {d.difficulty}

                </div>

                {/* =====================================================
                    PARTS
                ===================================================== */}

                {d.recommendedParts?.length > 0 && (

                  <div style={{
                    marginTop:"20px"
                  }}>

                    <div style={{
                      fontWeight:"bold"
                    }}>

                      Recommended Parts

                    </div>

                    {d.recommendedParts.map(
                      (p:string,pidx:number)=>(

                        <div
                          key={pidx}
                          style={{
                            marginTop:"6px"
                          }}
                        >

                          • {p}

                        </div>
                      )
                    )}

                  </div>
                )}

                {/* =====================================================
                    ACTIONS
                ===================================================== */}

                {d.recommendedActions?.length > 0 && (

                  <div style={{
                    marginTop:"20px"
                  }}>

                    <div style={{
                      fontWeight:"bold"
                    }}>

                      Recommended Actions

                    </div>

                    {d.recommendedActions.map(
                      (a:string,aidx:number)=>(

                        <div
                          key={aidx}
                          style={{
                            marginTop:"6px"
                          }}
                        >

                          • {a}

                        </div>
                      )
                    )}

                  </div>
                )}

              </div>
            )
          )}

        </div>
      )}

      {/* =====================================================
          OBD
      ===================================================== */}

      {results?.obd && (

        <div style={{
          marginTop:"40px",
          padding:"20px",
          background:"#fff8ef",
          borderRadius:"10px"
        }}>

          <h2>
            OBD Intelligence
          </h2>

          <div style={{
            marginTop:"12px",
            fontSize:"22px",
            fontWeight:"bold"
          }}>

            {results.obd.title}

          </div>

          <div style={{
            marginTop:"12px"
          }}>

            <b>Severity:</b>
            {" "}
            {results.obd.severity}

          </div>

          {results.obd.likelyCauses?.length > 0 && (

            <div style={{
              marginTop:"20px"
            }}>

              <div style={{
                fontWeight:"bold"
              }}>

                Likely Causes

              </div>

              {results.obd.likelyCauses.map(
                (c:string,idx:number)=>(

                  <div
                    key={idx}
                    style={{
                      marginTop:"8px"
                    }}
                  >

                    • {c}

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
