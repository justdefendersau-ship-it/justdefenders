// ====================================================================
// JustDefenders ©
// File: /frontend/app/garage/timeline/page.tsx
// Timestamp: 16 May 2026 17:05 Sydney
// ====================================================================

"use client"

import {
  useEffect,
  useState
} from "react"

import CanonicalDashboardShell
from "../../../components/layout/CanonicalDashboardShell"

interface TimelineEvent {

  type: string
  timestamp: string
  title: string
  detail: string
  severity: string
}

export default function TimelinePage() {

  const [
    timeline,
    setTimeline
  ] = useState<TimelineEvent[]>([])

  useEffect(() => {

    async function loadTimeline() {

      const response =
        await fetch(
          "/api/garage/timeline"
        )

      const data =
        await response.json()

      setTimeline(
        data.timeline || []
      )
    }

    loadTimeline()

  }, [])

  return (

    <CanonicalDashboardShell

      title="
        Maintenance Timeline
      "

      subtitle="
        Defender operational chronology
        and expedition lifecycle history.
      "
    >

      <div
        className="
          space-y-6
        "
      >

        {
          timeline.map(
            (
              event,
              index
            ) => (

              <div
                key={index}
                className="
                  rounded-3xl
                  border
                  border-zinc-800
                  bg-zinc-950/70
                  p-8
                "
              >

                <div className="flex items-center justify-between">

                  <div className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                    {event.type}
                  </div>

                  <div
                    className={
                      event.severity === "CRITICAL"
                        ? "text-red-400"
                        : event.severity === "WARNING"
                          ? "text-yellow-400"
                          : "text-green-400"
                    }
                  >

                    {event.severity}

                  </div>

                </div>

                <div className="mt-4 text-3xl font-black text-white">
                  {event.title}
                </div>

                <div className="mt-4 text-lg text-zinc-300">
                  {event.detail}
                </div>

                <div className="mt-6 text-sm text-zinc-500">
                  {
                    new Date(
                      event.timestamp
                    ).toLocaleString()
                  }
                </div>

              </div>
            )
          )
        }

      </div>

    </CanonicalDashboardShell>
  )
}