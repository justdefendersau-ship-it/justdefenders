"use client";

import {
  useState
} from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\feedback\page.tsx
//
// Timestamp:
// 2026-05-07 16:00
//
// Purpose:
// - Adaptive feedback intelligence UI
// =====================================================

export default function FeedbackPage(){

  const [vin, setVin] =
    useState("")

  const [symptom, setSymptom] =
    useState("")

  const [diagnosis, setDiagnosis] =
    useState("")

  const [repair, setRepair] =
    useState("")

  const [supplier, setSupplier] =
    useState("")

  const [feedback, setFeedback] =
    useState("")

  const [successful, setSuccessful] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [saved, setSaved] =
    useState(false)

  // =====================================================
  // SUBMIT
  // =====================================================

  async function submit(){

    setSaving(true)

    setSaved(false)

    await fetch(
      "/api/feedback",
      {
        method:"POST",

        headers:{
          "Content-Type":
            "application/json"
        },

        body:JSON.stringify({

          vin,

          symptom,

          diagnosis,

          repair,

          supplier,

          successful,

          feedback
        })
      }
    )

    setSaving(false)

    setSaved(true)
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div style={{
      maxWidth:"900px",
      margin:"0 auto",
      padding:"20px",
      fontFamily:"Arial"
    }}>

      <h1>
        Repair Outcome Feedback
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

        <textarea
          placeholder=
            "Original symptom..."

          value={symptom}

          onChange={(e)=>{

            setSymptom(
              e.target.value
            )
          }}

          style={{
            width:"100%",
            minHeight:"100px",
            padding:"12px",
            marginBottom:"14px"
          }}
        />

        <input
          placeholder="Diagnosis"

          value={diagnosis}

          onChange={(e)=>{

            setDiagnosis(
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
          placeholder="Repair Performed"

          value={repair}

          onChange={(e)=>{

            setRepair(
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
          placeholder="Supplier"

          value={supplier}

          onChange={(e)=>{

            setSupplier(
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
            "Outcome feedback..."

          value={feedback}

          onChange={(e)=>{

            setFeedback(
              e.target.value
            )
          }}

          style={{
            width:"100%",
            minHeight:"120px",
            padding:"12px"
          }}
        />

        {/* =====================================================
            SUCCESS
        ===================================================== */}

        <div style={{
          marginTop:"20px"
        }}>

          <label>

            <input
              type="checkbox"

              checked={successful}

              onChange={(e)=>{

                setSuccessful(
                  e.target.checked
                )
              }}
            />

            {" "}

            Repair successful

          </label>

        </div>

        {/* =====================================================
            BUTTON
        ===================================================== */}

        <button
          onClick={submit}

          style={{
            marginTop:"24px",
            padding:"12px 18px",
            background:"#0070f3",
            color:"#fff",
            border:"none",
            borderRadius:"6px",
            cursor:"pointer"
          }}
        >

          Submit Feedback

        </button>

        {/* =====================================================
            STATES
        ===================================================== */}

        {saving && (

          <div style={{
            marginTop:"20px"
          }}>

            Saving feedback...

          </div>
        )}

        {saved && (

          <div style={{
            marginTop:"20px",
            color:"green"
          }}>

            Feedback saved successfully.

          </div>
        )}

      </div>

    </div>
  )
}
