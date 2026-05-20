/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalTelemetryGrid.tsx
 *
 * Timestamp:
 * 17 May 2026 16:40 Sydney
 * ============================================================
 */

"use client"

import { motion } from "framer-motion"

import {
  Activity,
  AlertTriangle,
  Brain,
  Gauge,
  Shield,
  Truck
} from "lucide-react"

import {
  tacticalColors
} from "@/styles/tokens"

// ============================================================
// PANEL
// ============================================================

interface TacticalPanelProps {

  title: string

  subtitle: string

  icon: any

  accent: string

  children: React.ReactNode
}

function TacticalPanel({

  title,

  subtitle,

  icon: Icon,

  accent,

  children

}: TacticalPanelProps){

  return (

    <motion.div

      whileHover={{
        y: -3
      }}

      className="
        rounded-2xl
        border
        p-5
      "

      style={{

        background:
          tacticalColors.surfaceElevated,

        borderColor:
          tacticalColors.border,

        boxShadow:
          `0 0 28px ${accent}16`
      }}
    >

      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <div
        className="
          mb-5
          flex
          items-start
          justify-between
        "
      >

        <div>

          <div
            className="
              text-xs
              font-semibold
              tracking-[0.18em]
            "

            style={{
              color: accent
            }}
          >
            {title}
          </div>

          <div
            className="
              mt-2
              text-sm
            "

            style={{
              color:
                tacticalColors.textMuted
            }}
          >
            {subtitle}
          </div>

        </div>

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
          "

          style={{
            background:
              `${accent}18`
          }}
        >

          <Icon
            size={20}
            color={accent}
          />

        </div>

      </div>

      {/* ==================================================== */}
      {/* CONTENT */}
      {/* ==================================================== */}

      {children}

    </motion.div>
  )
}

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalTelemetryGrid(){

  return (

    <div
      className="
        mt-6
        grid
        gap-6
        lg:grid-cols-2
      "
    >

      {/* ==================================================== */}
      {/* PREDICTIVE MAINTENANCE */}
      {/* ==================================================== */}

      <TacticalPanel

        title="PREDICTIVE MAINTENANCE"

        subtitle="
        AI-driven operational lifecycle monitoring
        "

        icon={AlertTriangle}

        accent={tacticalColors.warning}
      >

        <div className="space-y-4">

          {[
            ["Turbo Hose", "78%"],
            ["Wheel Bearings", "61%"],
            ["Cooling System", "92%"],
            ["Brake Service", "44%"]
          ].map((item)=>{

            return (

              <div key={item[0]}>

                <div
                  className="
                    mb-2
                    flex
                    justify-between
                    text-sm
                  "

                  style={{
                    color:
                      tacticalColors.textPrimary
                  }}
                >

                  <span>{item[0]}</span>

                  <span>{item[1]}</span>

                </div>

                <div
                  className="
                    h-2
                    overflow-hidden
                    rounded-full
                  "

                  style={{
                    background:
                      tacticalColors.surface
                  }}
                >

                  <div
                    className="
                      h-full
                      rounded-full
                    "

                    style={{

                      width: item[1],

                      background:
                        tacticalColors.warning
                    }}
                  />

                </div>

              </div>
            )
          })}

        </div>

      </TacticalPanel>

      {/* ==================================================== */}
      {/* EXPEDITION READINESS */}
      {/* ==================================================== */}

      <TacticalPanel

        title="EXPEDITION READINESS"

        subtitle="
        Terrain survivability + operational confidence
        "

        icon={Shield}

        accent={tacticalColors.success}
      >

        <div
          className="
            grid
            grid-cols-2
            gap-4
          "
        >

          {[
            ["Fuel Range", "92%"],
            ["Cooling Stability", "88%"],
            ["Payload State", "81%"],
            ["Terrain Capability", "95%"]
          ].map((item)=>{

            return (

              <div
                key={item[0]}

                className="
                  rounded-xl
                  border
                  p-4
                "

                style={{

                  borderColor:
                    tacticalColors.border,

                  background:
                    tacticalColors.surface
                }}
              >

                <div
                  className="
                    text-xs
                    tracking-[0.14em]
                  "

                  style={{
                    color:
                      tacticalColors.textMuted
                  }}
                >
                  {item[0]}
                </div>

                <div
                  className="
                    mt-2
                    text-2xl
                    font-bold
                  "

                  style={{
                    color:
                      tacticalColors.success
                  }}
                >
                  {item[1]}
                </div>

              </div>
            )
          })}

        </div>

      </TacticalPanel>

      {/* ==================================================== */}
      {/* PROCUREMENT */}
      {/* ==================================================== */}

      <TacticalPanel

        title="PROCUREMENT INTELLIGENCE"

        subtitle="
        Supplier confidence + expedition suitability
        "

        icon={Truck}

        accent={tacticalColors.accentBlue}
      >

        <div className="space-y-4">

          {[
            ["OEM Defender Parts", "94"],
            ["Expedition Gear AU", "87"],
            ["Remote Touring Supply", "91"]
          ].map((item)=>{

            return (

              <div
                key={item[0]}

                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  p-4
                "

                style={{

                  borderColor:
                    tacticalColors.border,

                  background:
                    tacticalColors.surface
                }}
              >

                <div>

                  <div
                    className="
                      text-sm
                      font-semibold
                    "

                    style={{
                      color:
                        tacticalColors.textPrimary
                    }}
                  >
                    {item[0]}
                  </div>

                  <div
                    className="
                      mt-1
                      text-xs
                    "

                    style={{
                      color:
                        tacticalColors.textMuted
                    }}
                  >
                    Expedition supplier confidence
                  </div>

                </div>

                <div
                  className="
                    text-xl
                    font-bold
                  "

                  style={{
                    color:
                      tacticalColors.accentBlue
                  }}
                >
                  {item[1]}
                </div>

              </div>
            )
          })}

        </div>

      </TacticalPanel>

      {/* ==================================================== */}
      {/* AI OPERATIONS */}
      {/* ==================================================== */}

      <TacticalPanel

        title="AI OPERATIONS"

        subtitle="
        Tactical intelligence orchestration engine
        "

        icon={Brain}

        accent={tacticalColors.danger}
      >

        <div className="space-y-4">

          {[
            "AI predicts cooling system degradation within 2,300km",
            "Supplier volatility detected in AU east coast inventory",
            "Expedition readiness improved after payload rebalance",
            "Telemetry anomaly correlation detected"
          ].map((item)=>{

            return (

              <div
                key={item}

                className="
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  p-4
                "

                style={{

                  borderColor:
                    tacticalColors.border,

                  background:
                    tacticalColors.surface
                }}
              >

                <Activity
                  size={18}
                  color={tacticalColors.danger}
                />

                <div
                  className="
                    text-sm
                    leading-relaxed
                  "

                  style={{
                    color:
                      tacticalColors.textPrimary
                  }}
                >
                  {item}
                </div>

              </div>
            )
          })}

        </div>

      </TacticalPanel>

    </div>
  )
}