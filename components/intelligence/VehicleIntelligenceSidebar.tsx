/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\intelligence\VehicleIntelligenceSidebar.tsx
 *
 * Timestamp:
 * 23 May 2026 10:38 Sydney
 *
 * PURPOSE:
 * Tactical Defender Vehicle Intelligence Sidebar
 *
 * STRATEGY:
 * PASS 33B — Operational Intelligence Expansion
 *
 * OBJECTIVES:
 * - live Defender intelligence
 * - operational service intelligence
 * - procurement memory visibility
 * - tactical expedition readiness
 * - operational maintenance visibility
 * - synchronized vehicle intelligence
 *
 * ============================================================
 */

"use client"

import {

  Shield,
  Truck,
  Gauge,
  Wrench,
  Fuel,
  Globe2,
  Activity,
  Cpu,
  Star,
  AlertTriangle,
  Clock3,
  History,
  Radar

} from "lucide-react"

import {

  useVehicleContext

} from "@/contexts/VehicleContext"

import {

  useServiceIntelligence

} from "@/contexts/ServiceIntelligenceContext"

// ============================================================
// COMPONENT
// ============================================================

export default function VehicleIntelligenceSidebar(){

  const {

    vin,
    profile

  } = useVehicleContext()

  const {

    procurementHistory,
    serviceAlerts

  } = useServiceIntelligence()

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (

    !profile

  ){

    return (

      <aside
        className="
          rounded-[28px]
          border
          border-slate-800
          bg-[#07101F]
          p-6
        "
      >

        <div
          className="
            text-center
          "
        >

          <div
            className="
              text-[20px]
              font-black
              text-white
            "
          >
            No Vehicle Loaded
          </div>

          <div
            className="
              mt-3
              text-[13px]
              text-slate-400
            "
          >
            Enter a Defender VIN to activate operational vehicle intelligence.
          </div>

        </div>

      </aside>
    )
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <aside
      className="
        space-y-5
      "
    >

      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <section
        className="
          rounded-[28px]
          border
          border-slate-800
          bg-[#07101F]
          p-6
        "
      >

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >

          <div>

            <div
              className="
                text-[11px]
                font-black
                uppercase
                tracking-[0.22em]
                text-[#38BDF8]
              "
            >
              Vehicle Intelligence
            </div>

            <div
              className="
                mt-2
                text-[28px]
                font-black
                tracking-[-0.04em]
                text-white
              "
            >
              {profile.platform}
            </div>

            <div
              className="
                mt-2
                text-[14px]
                font-semibold
                text-slate-400
              "
            >
              {profile.body}
            </div>

          </div>

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              border-[#1D4ED8]
              bg-[#071B46]
            "
          >

            <Truck
              className="
                h-7
                w-7
                text-[#60A5FA]
              "
            />

          </div>

        </div>

        {/* ================================================== */}
        {/* VIN */}
        {/* ================================================== */}

        <div
          className="
            mt-5
            rounded-2xl
            border
            border-slate-800
            bg-[#050C18]
            px-4
            py-3
          "
        >

          <div
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.16em]
              text-slate-500
            "
          >
            Active VIN
          </div>

          <div
            className="
              mt-2
              break-all
              text-[13px]
              font-black
              tracking-[0.08em]
              text-[#4ADE80]
            "
          >
            {vin}
          </div>

        </div>

      </section>

      {/* ==================================================== */}
      {/* CORE INTELLIGENCE */}
      {/* ==================================================== */}

      <section
        className="
          rounded-[28px]
          border
          border-slate-800
          bg-[#07101F]
          p-6
        "
      >

        <div
          className="
            text-[12px]
            font-black
            uppercase
            tracking-[0.18em]
            text-slate-500
          "
        >
          Tactical Intelligence
        </div>

        <div
          className="
            mt-5
            space-y-4
          "
        >

          <IntelRow
            icon={<Cpu className="h-4 w-4" />}
            label="Engine"
            value={profile.engine}
          />

          <IntelRow
            icon={<Wrench className="h-4 w-4" />}
            label="Generation"
            value={profile.generation}
          />

          <IntelRow
            icon={<Globe2 className="h-4 w-4" />}
            label="Market"
            value={profile.market}
          />

          <IntelRow
            icon={<Fuel className="h-4 w-4" />}
            label="Fuel"
            value={profile.fuelType}
          />

          <IntelRow
            icon={<Truck className="h-4 w-4" />}
            label="Drivetrain"
            value={profile.drivetrain}
          />

          <IntelRow
            icon={<Activity className="h-4 w-4" />}
            label="Year"
            value={String(profile.year)}
          />

        </div>

      </section>

      {/* ==================================================== */}
      {/* SCORING */}
      {/* ==================================================== */}

      <section
        className="
          rounded-[28px]
          border
          border-slate-800
          bg-[#07101F]
          p-6
        "
      >

        <div
          className="
            text-[12px]
            font-black
            uppercase
            tracking-[0.18em]
            text-slate-500
          "
        >
          Expedition Readiness
        </div>

        <div
          className="
            mt-5
            grid
            grid-cols-2
            gap-4
          "
        >

          <ScoreCard
            icon={<Star className="h-5 w-5" />}
            label="Expedition"
            value={profile.expeditionScore}
            color="green"
          />

          <ScoreCard
            icon={<Shield className="h-5 w-5" />}
            label="Fitment"
            value={profile.fitmentConfidence}
            color="blue"
          />

        </div>

      </section>

      {/* ==================================================== */}
      {/* SERVICE ALERTS */}
      {/* ==================================================== */}

      {

        serviceAlerts.length > 0

        &&

        <section
          className="
            rounded-[28px]
            border
            border-slate-800
            bg-[#07101F]
            p-6
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <Radar
              className="
                h-5
                w-5
                text-[#F59E0B]
              "
            />

            <div
              className="
                text-[12px]
                font-black
                uppercase
                tracking-[0.18em]
                text-slate-500
              "
            >
              Service Intelligence
            </div>

          </div>

          <div
            className="
              mt-5
              space-y-4
            "
          >

            {

              serviceAlerts
                .slice(0, 3)
                .map(alert => (

                  <div
                    key={alert.id}
                    className="
                      rounded-2xl
                      border
                      border-slate-800
                      bg-[#050C18]
                      p-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-3
                      "
                    >

                      <div>

                        <div
                          className="
                            text-[14px]
                            font-black
                            text-white
                          "
                        >
                          {alert.title}
                        </div>

                        <div
                          className="
                            mt-2
                            text-[12px]
                            leading-relaxed
                            text-slate-400
                          "
                        >
                          {alert.recommendation}
                        </div>

                      </div>

                      <div
                        className={`
                          rounded-xl
                          px-3
                          py-2
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.14em]

                          ${
                            alert.severity === "CRITICAL"

                            ?

                            "bg-red-950 text-red-300"

                            :

                            alert.severity === "HIGH"

                            ?

                            "bg-amber-950 text-amber-300"

                            :

                            "bg-blue-950 text-blue-300"
                          }
                        `}
                      >
                        {alert.severity}
                      </div>

                    </div>

                  </div>
                ))
            }

          </div>

        </section>
      }

      {/* ==================================================== */}
      {/* MEMORY */}
      {/* ==================================================== */}

      <section
        className="
          rounded-[28px]
          border
          border-slate-800
          bg-[#07101F]
          p-6
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <History
            className="
              h-5
              w-5
              text-[#60A5FA]
            "
          />

          <div
            className="
              text-[12px]
              font-black
              uppercase
              tracking-[0.18em]
              text-slate-500
            "
          >
            Procurement Memory
          </div>

        </div>

        <div
          className="
            mt-5
            space-y-3
          "
        >

          {

            procurementHistory.length === 0

            ?

            <div
              className="
                rounded-2xl
                border
                border-slate-800
                bg-[#050C18]
                p-4
                text-[13px]
                text-slate-500
              "
            >
              No procurement history stored for this Defender profile yet.
            </div>

            :

            procurementHistory
              .slice(0, 5)
              .map(

                (

                  item,
                  index

                ) => (

                  <div
                    key={`${item.query}-${index}`}
                    className="
                      rounded-2xl
                      border
                      border-slate-800
                      bg-[#050C18]
                      p-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-3
                      "
                    >

                      <div
                        className="
                          text-[13px]
                          font-black
                          text-white
                        "
                      >
                        {item.query}
                      </div>

                      {

                        item.supplier

                        &&

                        <div
                          className="
                            rounded-xl
                            border
                            border-slate-700
                            bg-[#07101F]
                            px-3
                            py-2
                            text-[10px]
                            font-black
                            text-slate-300
                          "
                        >
                          {item.supplier}
                        </div>
                      }

                    </div>

                    <div
                      className="
                        mt-2
                        flex
                        items-center
                        gap-2
                        text-[11px]
                        text-slate-500
                      "
                    >

                      <Clock3
                        className="
                          h-3
                          w-3
                        "
                      />

                      {

                        new Date(
                          item.timestamp
                        ).toLocaleString()
                      }

                    </div>

                  </div>
                )
              )
          }

        </div>

      </section>

      {/* ==================================================== */}
      {/* PROCUREMENT */}
      {/* ==================================================== */}

      <section
        className="
          rounded-[28px]
          border
          border-slate-800
          bg-[#07101F]
          p-6
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <AlertTriangle
            className="
              h-5
              w-5
              text-[#F59E0B]
            "
          />

          <div
            className="
              text-[12px]
              font-black
              uppercase
              tracking-[0.18em]
              text-slate-500
            "
          >
            Procurement Priority
          </div>

        </div>

        <div
          className="
            mt-5
            rounded-2xl
            border
            border-[#7C2D12]
            bg-[#451A03]
            px-5
            py-4
          "
        >

          <div
            className="
              text-[28px]
              font-black
              tracking-[-0.04em]
              text-[#FBBF24]
            "
          >
            {profile.procurementPriority}
          </div>

          <div
            className="
              mt-2
              text-[13px]
              leading-relaxed
              text-amber-100/70
            "
          >
            Tactical procurement monitoring active for this Defender profile.
          </div>

        </div>

      </section>

    </aside>
  )
}

// ============================================================
// INTEL ROW
// ============================================================

function IntelRow({

  icon,
  label,
  value

}: {

  icon: React.ReactNode

  label: string

  value: string

}){

  return (

    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        rounded-2xl
        border
        border-slate-800
        bg-[#050C18]
        px-4
        py-3
      "
    >

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        <div
          className="
            text-[#60A5FA]
          "
        >
          {icon}
        </div>

        <div
          className="
            text-[13px]
            font-bold
            text-slate-400
          "
        >
          {label}
        </div>

      </div>

      <div
        className="
          text-[14px]
          font-black
          text-white
        "
      >
        {value}
      </div>

    </div>
  )
}

// ============================================================
// SCORE CARD
// ============================================================

function ScoreCard({

  icon,
  label,
  value,
  color

}: {

  icon: React.ReactNode

  label: string

  value: number

  color:
    "green"
    |
    "blue"

}){

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-800
        bg-[#050C18]
        p-5
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div
          className={`
            ${
              color === "green"
              ?
              "text-[#4ADE80]"
              :
              "text-[#60A5FA]"
            }
          `}
        >
          {icon}
        </div>

        <div
          className="
            text-[10px]
            font-black
            uppercase
            tracking-[0.14em]
            text-slate-500
          "
        >
          {label}
        </div>

      </div>

      <div
        className={`
          mt-4
          text-[42px]
          font-black
          tracking-[-0.06em]

          ${
            color === "green"
            ?
            "text-[#4ADE80]"
            :
            "text-[#60A5FA]"
          }
        `}
      >
        {value}
      </div>

    </div>
  )
}