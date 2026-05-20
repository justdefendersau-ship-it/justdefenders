"use client";

import {
  useState
} from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\predictive\page.tsx
//
// Timestamp:
// 2026-05-07 13:00
//
// Purpose:
// - Predictive ownership intelligence UI
// =====================================================

export default function PredictivePage(){

  const [vin, setVin] =
    useState("")

  const [mileage, setMileage] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [results, setResults] =
    useState<any>(null)

  // =====================================================
  // RUN
  // =====================================================

  async function runPrediction(){

    setLoading(true)

    const res =
      await fetch(
        "/api/predictive",
        {
          method:"POST",

          headers:{
            "Content-Type":
              "application/json"
          },

          body:JSON.stringify({

            vin,

            mileage
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
        Predictive Ownership Intelligence
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
          placeholder="Mileage (km)"

          value={mileage}

          onChange={(e)=>{

            setMileage(
              e.target.value
            )
          }}

          style={{
            width:"100%",
            padding:"12px"
          }}
        />

        <button
          onClick={runPrediction}

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

          Run Predictive Analysis

        </button>

      </div>

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (

        <div style={{
          marginTop:"20px"
        }}>

          Running predictive analysis...

        </div>
      )}

      {/* =====================================================
          RESULTS
      ===================================================== */}

      {results?.predictions && (

        <div style={{
          marginTop:"40px"
        }}>

          <h2>
            Predicted Ownership Insights
          </h2>

          {results.predictions.map(
            (p:any,idx:number)=>(

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
                  fontSize:"20px",
                  fontWeight:"bold"
                }}>

                  {p.title}

                </div>

                <div style={{
                  marginTop:"10px"
                }}>

                  {p.description}

                </div>

                <div style={{
                  marginTop:"12px",
                  fontSize:"14px"
                }}>

                  <b>Category:</b>
                  {" "}
                  {p.category}

                  {" • "}

                  <b>Priority:</b>
                  {" "}
                  {p.priority}

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  )
}
