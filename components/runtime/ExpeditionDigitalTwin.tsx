"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\ExpeditionDigitalTwin.tsx
//
// Timestamp:
// 28 May 2026 16:00 Sydney
//
// PURPOSE:
// Expedition operational digital twin engine.
// ====================================================================

export default function ExpeditionDigitalTwin(){

  const [
    topology,
    setTopology
  ] = useState<any[]>([])

  const [
    state,
    setState
  ] = useState("SYNCHRONIZED")

  // ================================================================
// LOAD
// ================================================================

  async function loadTopology(){

    try {

      const response =
        await fetch(
          "/api/fose/state"
        )

      const result =
        await response.json()

      const readiness =
        result.state
        ?.expeditionReadiness || 0

      const survivability =
        result.state
        ?.survivabilityScore || 0

      const nodes = [

        {
          id:"Alpha",
          x:20,
          y:30,
          readiness,
          survivability
        },

        {
          id:"Bravo",
          x:50,
          y:60,
          readiness:
            readiness - 8,

          survivability:
            survivability - 5
        },

        {
          id:"Charlie",
          x:78,
          y:35,
          readiness:
            readiness + 4,

          survivability:
            survivability + 3
        }
      ]

      setTopology(nodes)

      // ============================================================
      // STATE
      // ============================================================

      if(
        survivability < 55
      ){

        setState(
          "FRAGMENTED"
        )
      }

      else if(
        survivability < 70
      ){

        setState(
          "STRESSED"
        )
      }

      else if(
        readiness < 80
      ){

        setState(
          "DISTRIBUTED"
        )
      }

      else {

        setState(
          "SYNCHRONIZED"
        )
      }

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    loadTopology()

    const interval =

      setInterval(
        loadTopology,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  // ================================================================
  // COLORS
  // ================================================================

  function getColor(){

    switch(state){

      case "FRAGMENTED":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "STRESSED":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      case "DISTRIBUTED":

        return `
          border-yellow-500
          bg-yellow-950
          text-yellow-300
        `

      default:

        return `
          border-green-500
          bg-green-950
          text-green-300
        `
    }
  }

  // ================================================================
  // NODE COLORS
  // ================================================================

  function getNodeColor(
    survivability:number
  ){

    if(
      survivability < 60
    ){

      return "bg-red-500"
    }

    if(
      survivability < 75
    ){

      return "bg-yellow-400"
    }

    return "bg-green-400"
  }

  // ================================================================
  // PAGE
  // ================================================================

  return (

    <div
      className={`
        border
        rounded-2xl
        p-6
        mb-8

        ${getColor()}
      `}
    >

      <div
        className="
          flex
          items-center
          justify-between
          mb-6
        "
      >

        <div>

          <div
            className="
              text-sm
              opacity-80
              mb-2
            "
          >

            EXPEDITION DIGITAL TWIN

          </div>

          <div
            className="
              text-4xl
              font-black
            "
          >

            {state}

          </div>

        </div>

        <div
          className="
            px-4
            py-2
            rounded-full
            border
            border-cyan-500
            bg-cyan-950
            text-cyan-300
            text-sm
            font-bold
          "
        >

          LIVE TOPOLOGY

        </div>

      </div>

      <div
        className="
          relative
          h-[420px]
          rounded-2xl
          border
          border-zinc-800
          bg-black
          overflow-hidden
        "
      >

        {/* CONNECTION LINES */}

        <svg
          className="
            absolute
            inset-0
            w-full
            h-full
          "
        >

          <line
            x1="20%"
            y1="30%"
            x2="50%"
            y2="60%"
            stroke="#3f3f46"
            strokeWidth="2"
          />

          <line
            x1="50%"
            y1="60%"
            x2="78%"
            y2="35%"
            stroke="#3f3f46"
            strokeWidth="2"
          />

          <line
            x1="20%"
            y1="30%"
            x2="78%"
            y2="35%"
            stroke="#3f3f46"
            strokeWidth="2"
          />

        </svg>

        {/* NODES */}

        {
          topology.map(

            (
              node,
              index
            ) => (

              <div

                key={index}

                className="
                  absolute
                  flex
                  flex-col
                  items-center
                "

                style={{

                  left:`${node.x}%`,
                  top:`${node.y}%`
                }}
              >

                <div
                  className={`
                    w-6
                    h-6
                    rounded-full
                    border-4
                    border-black
                    shadow-2xl

                    ${getNodeColor(
                      node.survivability
                    )}
                  `}
                />

                <div
                  className="
                    mt-3
                    text-sm
                    font-bold
                  "
                >

                  {node.id}

                </div>

                <div
                  className="
                    mt-1
                    text-[10px]
                    opacity-70
                    text-center
                  "
                >

                  READY {node.readiness}%

                  <br />

                  SURV {node.survivability}%

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}