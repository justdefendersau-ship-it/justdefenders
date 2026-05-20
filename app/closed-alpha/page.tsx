"use client"

import {
  useEffect,
  useState
}
from "react"

import AlphaStatusCard from
"../../components/alpha/AlphaStatusCard"

export default function ClosedAlpha(){

  const [
    telemetry,
    setTelemetry
  ] = useState([])

  const [
    feedback,
    setFeedback
  ] = useState([])

  useEffect(() => {

    async function load(){

      const telemetryResponse =
      await fetch(
        "/api/alpha/telemetry"
      )

      const feedbackResponse =
      await fetch(
        "/api/alpha/feedback"
      )

      const telemetryData =
      await telemetryResponse.json()

      const feedbackData =
      await feedbackResponse.json()

      setTelemetry(
        telemetryData.telemetry
      )

      setFeedback(
        feedbackData.feedback
      )
    }

    load()

  },[])

  return (

    <main
      style={{

        background:"#EEF2F7",

        minHeight:"100vh",

        padding:"24px",

        fontFamily:"Arial"
      }}
    >

      <div
        style={{
          marginBottom:"30px"
        }}
      >

        <h1>
          Closed Alpha Execution
        </h1>

        <p>
          Operational Validation Environment
        </p>

      </div>

      <div
        style={{

          display:"grid",

          gridTemplateColumns:
          "repeat(auto-fit,minmax(240px,1fr))",

          gap:"18px",

          marginBottom:"24px"
        }}
      >

        <AlphaStatusCard
          title="Workflow Completion"
          value="91%"
          status="HEALTHY"
        />

        <AlphaStatusCard
          title="Voice Workflow Quality"
          value="79%"
          status="OPTIMISING"
        />

        <AlphaStatusCard
          title="Scan Workflow Quality"
          value="88%"
          status="HEALTHY"
        />

      </div>

      <div
        style={{

          background:"white",

          borderRadius:"18px",

          padding:"24px",

          marginBottom:"24px"
        }}
      >

        <h2>
          Workflow Telemetry
        </h2>

        {

          telemetry.map(

            (
              item:any,
              index:number
            ) => (

              <div
                key={index}
                style={{
                  marginBottom:"14px"
                }}
              >

                <strong>
                  {item.workflow}
                </strong>

                <p>
                  Completion:
                  {item.completionRate}%
                </p>

                <p>
                  Friction:
                  {item.frictionLevel}
                </p>

              </div>
            )
          )
        }

      </div>

      <div
        style={{

          background:"white",

          borderRadius:"18px",

          padding:"24px"
        }}
      >

        <h2>
          Alpha Feedback
        </h2>

        {

          feedback.map(

            (
              item:any,
              index:number
            ) => (

              <div
                key={index}
                style={{
                  marginBottom:"14px"
                }}
              >

                <strong>
                  {item.tester}
                </strong>

                <p>
                  {item.feedback}
                </p>

              </div>
            )
          )
        }

      </div>

    </main>
  )
}