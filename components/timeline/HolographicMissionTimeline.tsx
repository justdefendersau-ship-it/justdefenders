"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/timeline/HolographicMissionTimeline.tsx

   Timestamp:
   11 May 2026 16:45 (Sydney)

   PURPOSE:
   Holographic mission telemetry timeline
===================================================== */

import React
from "react"

import {
  motion
}
from "framer-motion"

const EVENTS = [

  {

    id:1,

    time:"16:02",

    title:"Threat escalation detected"
  },

  {

    id:2,

    time:"16:07",

    title:"Telemetry ingestion increased"
  },

  {

    id:3,

    time:"16:12",

    title:"AI predictive escalation triggered"
  },

  {

    id:4,

    time:"16:18",

    title:"Command federation synchronised"
  }
]

export default function HolographicMissionTimeline(){

  return (

    <div className="jd-timeline-shell">

      <div className="jd-panel-title">

        Live Mission Timeline

      </div>

      {

        EVENTS.map(
          (
            event,
            index
          )=>(

            <motion.div

              key={event.id}

              initial={{

                opacity:0,

                x:-20
              }}

              animate={{

                opacity:1,

                x:0
              }}

              transition={{

                delay:index * 0.15
              }}

              className="jd-timeline-event"
            >

              <div className="jd-timeline-time">

                {event.time}

              </div>

              <div className="jd-timeline-title">

                {event.title}

              </div>

            </motion.div>
          )
        )
      }

    </div>
  )
}
