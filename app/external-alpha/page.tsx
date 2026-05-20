"use client"

import {
  useEffect,
  useState
}
from "react"

import ExternalAlphaCard from
"../../components/external-alpha/ExternalAlphaCard"

export default function ExternalAlpha(){

  const [
    telemetry,
    setTelemetry
  ] = useState([])

  const [
    feedback,
    setFeedback
  ] = useState([])

  const [
    fieldStatus,
    setFieldStatus
  ] = useState([])

  useEffect(() => {

    async function load(){

      const telemetryResponse =
      await fetch(
        "/api/external-alpha/telemetry"
      )

      const feedbackResponse =
      await fetch(
        "/api/external-alpha/feedback"
      )

      const statusResponse =
      await fetch(
        "/api/external-alpha/field-status"
      )

      const telemetryData =
      await telemetryResponse.json()

      const feedbackData =
      await feedbackResponse.json()

      const statusData =
      await statusResponse.json()

      setTelemetry(
        telemetryData.telemetry
      )

      setFeedback(
        feedbackData.feedback
      )

      setFieldStatus(
        statusData.fieldStatus
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
          marginBottom:"28px"
        }}
      >

        <h1>
          External Alpha Rollout
        </h1>

        <p>
          Real Workshop + Expedition + Mobile Validation
        </p>

      </div>

      <div
        style={{

          display:"grid",

          gridTemplateColumns:
          "repeat(auto-fit,minmax(260px,1fr))",

          gap:"18px",

          marginBottom:"28px"
        }}
      >

        {

          telemetry.map(

            (
              item:any,
              index:number
            ) => (

              <ExternalAlphaCard

                key={index}

                title={item.scenario}

                score={item.trustScore}

                usability={item.mobileUsability}

              />
            )
          )
        }

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
          Field Testing Status
        </h2>

        {

          fieldStatus.map(

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
                  {item.field}
                </strong>

                <p>
                  Status:
                  {item.status}
                </p>

                <p>
                  Active Users:
                  {item.users}
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
          External Alpha Feedback
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