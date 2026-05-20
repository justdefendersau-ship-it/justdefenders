// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\conversational-ai\page.tsx
// Timestamp: 14 May 2026 18:40 Sydney

"use client"

import React, {
  useState
} from "react"

interface ConversationContext {
  vehicle: string
  issue: string
  confidence: number
  recommendation: string
}

export default function ConversationalAIPage() {

  const [query, setQuery] =
    useState<string>("")

  const [context] =
    useState<ConversationContext>({
      vehicle:
        "Land Rover Defender Puma 2.2",

      issue:
        "Intermittent boost pressure fluctuation",

      confidence: 88,

      recommendation:
        "Inspect intercooler hoses, MAP sensor readings, and turbo actuator operation."
    })

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): void {

    e.preventDefault()

    console.log(
      "AI Query Submitted:",
      query
    )
  }

  return (

    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        padding: "32px"
      }}
    >

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto"
        }}
      >

        <h1
          style={{
            color: "#ffffff",
            fontSize: "36px",
            fontWeight: 800,
            marginBottom: "32px"
          }}
        >
          Conversational AI
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: "32px"
          }}
        >

          <div
            style={{
              display: "flex",
              gap: "12px"
            }}
          >

            <input
              value={query}
              onChange={(e) =>
                setQuery(
                  e.target.value
                )
              }
              placeholder="Ask the AI operations engine..."
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "12px",
                border:
                  "1px solid #334155",
                background: "#111827",
                color: "#ffffff"
              }}
            />

            <button
              type="submit"
              style={{
                background: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                padding:
                  "14px 20px",
                cursor: "pointer",
                fontWeight: 700
              }}
            >
              Analyse
            </button>

          </div>

        </form>

        <div
          style={{
            background: "#0f172a",
            borderRadius: "20px",
            padding: "28px",
            border:
              "1px solid rgba(255,255,255,0.08)"
          }}
        >

          <h2
            style={{
              color: "#ffffff",
              marginTop: 0,
              marginBottom: "20px"
            }}
          >
            AI Diagnostic Context
          </h2>

          <div
            style={{
              display: "grid",
              gap: "16px"
            }}
          >

            <p
              style={{
                color: "#cbd5e1",
                margin: 0
              }}
            >
              <strong>
                Vehicle:
              </strong>
              {" "}
              {context.vehicle}
            </p>

            <p
              style={{
                color: "#cbd5e1",
                margin: 0
              }}
            >
              <strong>
                Detected Issue:
              </strong>
              {" "}
              {context.issue}
            </p>

            <p
              style={{
                color: "#93c5fd",
                margin: 0,
                fontWeight: 700
              }}
            >
              Confidence:
              {" "}
              {context.confidence}%
            </p>

            <div>

              <div
                style={{
                  color: "#94a3b8",
                  marginBottom: "8px",
                  fontSize: "13px"
                }}
              >
                Recommendation
              </div>

              <div
                style={{
                  color: "#ffffff",
                  lineHeight: 1.7
                }}
              >
                {context.recommendation}
              </div>

            </div>

          </div>

        </div>

      </div>

    </main>

  )
}