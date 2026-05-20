"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/MissionReplayPanel.tsx

   Timestamp:
   13 May 2026 04:45 (Sydney)

   PURPOSE:
   Mission replay visualisation
===================================================== */

import React from "react"

import {

  getMissionReplays

}
from "../../lib/replay/expeditionMissionReplayEngine"

export default function MissionReplayPanel(){

  const replays =
    getMissionReplays()

  return (

    <div className="jd-replay-shell">

      <div className="jd-replay-header">

        EXPEDITION MISSION REPLAY

      </div>

      {

        replays.map(

          (
            replay:any,
            idx:number
          )=>(

            <div
              key={idx}
              className={`jd-replay-card ${replay.replayState}`}
            >

              {/* ============================= */}
              {/* TOP */}
              {/* ============================= */}

              <div className="jd-replay-top">

                <div>

                  <div className="jd-replay-name">

                    {replay.expeditionName}

                  </div>

                  <div className="jd-replay-region">

                    {replay.operationalRegion}

                  </div>

                </div>

                <div className="jd-replay-state">

                  {replay.replayState}

                </div>

              </div>

              {/* ============================= */}
              {/* GRID */}
              {/* ============================= */}

              <div className="jd-replay-grid">

                <div>

                  Duration:
                  {" "}
                  {replay.missionDurationHours}h

                </div>

                <div>

                  Survivability:
                  {" "}
                  {replay.survivabilityScore}%

                </div>

                <div>

                  Telemetry:
                  {" "}
                  {replay.telemetryEvents}

                </div>

                <div>

                  AI Confidence:
                  {" "}
                  {replay.aiReplayConfidence}%

                </div>

              </div>

              {/* ============================= */}
              {/* EVENTS */}
              {/* ============================= */}

              <div className="jd-replay-events">

                {

                  replay.reconstructedEvents?.map(

                    (
                      event:string,
                      eventIdx:number
                    )=>(

                      <div
                        key={eventIdx}
                        className="jd-replay-event"
                      >

                        {event}

                      </div>
                    )
                  )
                }

              </div>

              {/* ============================= */}
              {/* INSIGHT */}
              {/* ============================= */}

              <div className="jd-replay-insight">

                {replay.replayInsights?.[0]}

              </div>

              {/* ============================= */}
              {/* FORECAST */}
              {/* ============================= */}

              <div className="jd-replay-forecast">

                {replay.neuralForecasts?.[0]}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}
