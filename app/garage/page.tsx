/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\garage\page.tsx
 *
 * Timestamp:
 * 23 May 2026 23:58 Sydney
 *
 * PURPOSE:
 * Tactical Garage Operations Dashboard
 *
 * STRATEGY:
 * PASS 44C — Garage Tactical Migration
 *
 * OBJECTIVES:
 * - unified operational garage dashboard
 * - tactical vehicle intelligence
 * - expedition survivability telemetry
 * - predictive maintenance visualization
 * - operational readiness UX
 * - responsive command-centre layout
 * - dark operational shell migration
 *
 * ============================================================
 */

"use client"

import VehicleMetric from "@/components/garage/VehicleMetric"
import AlertCard from "@/components/garage/AlertCard"
import type { GarageVehicleSummary } from "@/lib/domain/vehicle"
import {

    mapGaragePresentation

} from "@/lib/garage/presentation/GaragePresentationMapper"
import {

    useDigitalTwin

} from "@/contexts/DigitalTwinContext"

import {

    createGarageViewModel

} from "@/lib/garage/GarageViewModel"

import {

  Activity,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock3,
  Fuel,
  Gauge,
  Globe,
  Shield,
  Truck,
  Wrench

} from "lucide-react"

import OperationalAppShell, {

  OperationalActionButton,
  OperationalCard

} from "@/components/layout/OperationalAppShell"

// ============================================================
// VEHICLES
// ============================================================

const vehicles: GarageVehicleSummary[] = [

{

    id:
        "vehicle-001",

    vin:
        "SALLDHM88XA123456",

    displayName:
        "Td5 110 1999",

    model:
        "Defender 110",

    year:
        1999,

    engine:
        "Td5",

    status:
        "STABLE",

    readiness:
        92,

    expeditionReadiness:
        94,

    survivability:
        89,

    nextServiceKm:
        2140,

    fuelRangeKm:
        742,

    healthScore:
        91,

    selected:
        true

},

{

    id:
        "vehicle-002",

    vin:
        "SALLDHMF7CA765432",

    displayName:
        "Puma 2.2 110 2012",

    model:
        "Defender 110",

    year:
        2012,

    engine:
        "2.2 Puma",

    status:
        "ATTENTION",

    readiness:
        84,

    expeditionReadiness:
        79,

    survivability:
        81,

    nextServiceKm:
        420,

    fuelRangeKm:
        618,

    healthScore:
        83,

    selected:
        false

}
]

// ============================================================
// MAINTENANCE
// ============================================================

const maintenanceEvents = [

  {

    title:
      "Rear Hub Inspection",

    severity:
      "WARNING",

    vehicle:
      "Td5 110 1999",

    due:
      "5 Days"
  },

  {

    title:
      "Coolant System Service",

    severity:
      "INFO",

    vehicle:
      "Puma 2.2 110 2012",

    due:
      "14 Days"
  },

  {

    title:
      "Front Propshaft Monitoring",

    severity:
      "CRITICAL",

    vehicle:
      "Td5 110 1999",

    due:
      "Immediate"
  }
]

// ============================================================
// COMPONENT
// ============================================================

export default function GaragePage(){

  const {

    digitalTwins,

    selectedVin

} = useDigitalTwin()

const garage = createGarageViewModel(

    digitalTwins,

    {

        selectedVin

    }

)

const vehicles = mapGaragePresentation(

    garage.vehicles

)

return (

    <OperationalAppShell

      title="Garage"

      subtitle="
        Tactical vehicle intelligence, operational readiness telemetry,
        expedition survivability analysis, predictive maintenance,
        and deployment capability visualization.
      "

      actions={

        <>

          <OperationalActionButton

            icon={
              <Truck className="h-4 w-4" />
            }

            label="Add Vehicle"
          />

          <OperationalActionButton

            icon={
              <Wrench className="h-4 w-4" />
            }

            label="Maintenance"

            variant="secondary"
          />

        </>
      }

      telemetry={

        <div
          className="
            grid
            gap-5

            md:grid-cols-2
            xl:grid-cols-5
          "
        >

          <TelemetryCard
            icon={
              <Truck className="h-5 w-5" />
            }
            label="Vehicles"
            value="2"
            status="ACTIVE"
          />

          <TelemetryCard
            icon={
              <Shield className="h-5 w-5" />
            }
            label="Fleet Readiness"
            value="88"
            status="HEALTHY"
          />

          <TelemetryCard
            icon={
              <Globe className="h-5 w-5" />
            }
            label="Expedition"
            value="READY"
            status="LIVE"
          />

          <TelemetryCard
            icon={
              <Activity className="h-5 w-5" />
            }
            label="Telemetry"
            value="ACTIVE"
            status="TRACKING"
          />

          <TelemetryCard
            icon={
              <AlertTriangle className="h-5 w-5" />
            }
            label="Maintenance"
            value="3"
            status="WARNING"
          />

        </div>
      }
    >

      {/* ==================================================== */}
      {/* VEHICLES */}
      {/* ==================================================== */}

      <div
        className="
          grid
          gap-8

          2xl:grid-cols-[1.3fr_0.7fr]
        "
      >

        {/* ================================================== */}
        {/* LEFT */}
        {/* ================================================== */}

        <div
          className="
            space-y-8
          "
        >

          {/* =============================================== */}
          {/* VEHICLE OVERVIEW */}
          {/* =============================================== */}

          <OperationalCard

            eyebrow="Operational Vehicle Intelligence"

            title="Fleet Readiness Overview"

          >

            <div
              className="
                space-y-6
              "
            >

              {

                vehicles.map(vehicle => (

                  <div
                    key={vehicle.vin}
                    className="
                      rounded-[30px]
                      border
                      border-slate-800
                      bg-[#020817]
                      p-7
                    "
                  >

                    {/* =================================== */}
                    {/* TOP */}
                    {/* =================================== */}

                    <div
                      className="
                        flex
                        flex-col
                        gap-6

                        xl:flex-row
                        xl:items-start
                        xl:justify-between
                      "
                    >

                      <div>

                        <div
                          className="
                            text-[28px]
                            font-black
                            tracking-[-0.05em]
                            text-white
                          "
                        >
                          {vehicle.name}
                        </div>

                        <div
                          className="
                            mt-3
                            text-[12px]
                            uppercase
                            tracking-[0.16em]
                            text-slate-500
                          "
                        >
                          {vehicle.vin}
                        </div>

                      </div>

                      <div
                        className={`
                          inline-flex
                          rounded-full
                          border
                          px-5
                          py-3
                          text-[11px]
                          font-black
                          uppercase
                          tracking-[0.18em]

                          ${

                            vehicle.maintenance === "STABLE"

                            ?

                            `
                            border-emerald-800
                            bg-emerald-950/20
                            text-emerald-300
                            `

                            :

                            `
                            border-amber-800
                            bg-amber-950/20
                            text-amber-300
                            `
                          }
                        `}
                      >
                        {vehicle.maintenance}
                      </div>

                    </div>

                    {/* =================================== */}
                    {/* GRID */}
                    {/* =================================== */}

                    <div
                      className="
                        mt-8
                        grid
                        gap-5

                        md:grid-cols-2
                        xl:grid-cols-5
                      "
                    >

                      <VehicleMetric
                        icon={
                          <Shield className="h-4 w-4" />
                        }
                        label="Readiness"
                        value={String(vehicle.readiness)}
                        accent="cyan"
                      />

                      <VehicleMetric
                        icon={
                          <Globe className="h-4 w-4" />
                        }
                        label="Survivability"
                        value={String(vehicle.survivability)}
                        accent="green"
                      />

                      <VehicleMetric
                        icon={
                          <Activity className="h-4 w-4" />
                        }
                        label="Expedition"
                        value={String(vehicle.expedition)}
                        accent="cyan"
                      />

                      <VehicleMetric
                        icon={
                          <Clock3 className="h-4 w-4" />
                        }
                        label="Service"
                        value={vehicle.nextService}
                        accent="amber"
                      />

                      <VehicleMetric
                        icon={
                          <Fuel className="h-4 w-4" />
                        }
                        label="Fuel Range"
                        value={vehicle.fuelRange}
                        accent="green"
                      />

                    </div>

                  </div>
                ))
              }

            </div>

          </OperationalCard>

          {/* =============================================== */}
          {/* MAINTENANCE */}
          {/* =============================================== */}

          <OperationalCard

            eyebrow="Predictive Maintenance Intelligence"

            title="Operational Maintenance Timeline"

          >

            <div
              className="
                space-y-5
              "
            >

              {

                maintenanceEvents.map(event => (

                  <div
                    key={event.title}
                    className="
                      flex
                      flex-col
                      gap-5
                      rounded-[26px]
                      border
                      border-slate-800
                      bg-[#020817]
                      p-6

                      xl:flex-row
                      xl:items-center
                      xl:justify-between
                    "
                  >

                    {/* =================================== */}
                    {/* LEFT */}
                    {/* =================================== */}

                    <div
                      className="
                        flex
                        items-start
                        gap-5
                      "
                    >

                      <div
                        className={`
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          border

                          ${

                            event.severity === "CRITICAL"

                            ?

                            `
                            border-red-800
                            bg-red-950/20
                            text-red-300
                            `

                            :

                            event.severity === "WARNING"

                            ?

                            `
                            border-amber-800
                            bg-amber-950/20
                            text-amber-300
                            `

                            :

                            `
                            border-cyan-800
                            bg-cyan-950/20
                            text-cyan-300
                            `
                          }
                        `}
                      >

                        <Wrench className="h-5 w-5" />

                      </div>

                      <div>

                        <div
                          className="
                            text-[16px]
                            font-black
                            text-white
                          "
                        >
                          {event.title}
                        </div>

                        <div
                          className="
                            mt-2
                            text-[13px]
                            text-slate-500
                          "
                        >
                          {event.vehicle}
                        </div>

                      </div>

                    </div>

                    {/* =================================== */}
                    {/* RIGHT */}
                    {/* =================================== */}

                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-4
                      "
                    >

                      <div
                        className="
                          inline-flex
                          items-center
                          gap-3
                          rounded-full
                          border
                          border-slate-800
                          bg-[#07101F]
                          px-5
                          py-3
                        "
                      >

                        <Calendar
                          className="
                            h-4
                            w-4
                            text-[#38BDF8]
                          "
                        />

                        <div
                          className="
                            text-[12px]
                            font-black
                            uppercase
                            tracking-[0.14em]
                            text-white
                          "
                        >
                          {event.due}
                        </div>

                      </div>

                      <div
                        className={`
                          rounded-full
                          border
                          px-4
                          py-3
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.18em]

                          ${

                            event.severity === "CRITICAL"

                            ?

                            `
                            border-red-800
                            bg-red-950/20
                            text-red-300
                            `

                            :

                            event.severity === "WARNING"

                            ?

                            `
                            border-amber-800
                            bg-amber-950/20
                            text-amber-300
                            `

                            :

                            `
                            border-cyan-800
                            bg-cyan-950/20
                            text-cyan-300
                            `
                          }
                        `}
                      >
                        {event.severity}
                      </div>

                    </div>

                  </div>
                ))
              }

            </div>

          </OperationalCard>

        </div>

        {/* ================================================== */}
        {/* RIGHT */}
        {/* ================================================== */}

        <div
          className="
            space-y-8
          "
        >

          {/* =============================================== */}
          {/* DEPLOYMENT */}
          {/* =============================================== */}

          <OperationalCard

            eyebrow="Expedition Intelligence"

            title="Deployment Readiness"

          >

            <div
              className="
                flex
                flex-col
                items-center
                justify-center
              "
            >

              <div
                className="
                  flex
                  h-[220px]
                  w-[220px]
                  items-center
                  justify-center
                  rounded-full
                  border-[14px]
                  border-cyan-900
                  bg-[#020817]
                "
              >

                <div
                  className="
                    text-center
                  "
                >

                  <div
                    className="
                      text-[76px]
                      font-black
                      tracking-[-0.10em]
                      text-[#38BDF8]
                    "
                  >
                    91
                  </div>

                  <div
                    className="
                      text-[12px]
                      font-black
                      uppercase
                      tracking-[0.22em]
                      text-slate-500
                    "
                  >
                    Operational Score
                  </div>

                </div>

              </div>

              <div
                className="
                  mt-8
                  text-center
                "
              >

                <div
                  className="
                    text-[18px]
                    font-black
                    text-white
                  "
                >
                  Expedition Ready
                </div>

                <div
                  className="
                    mt-3
                    text-[14px]
                    leading-relaxed
                    text-slate-500
                  "
                >
                  Fleet survivability and expedition telemetry
                  operating within tactical deployment thresholds.
                </div>

              </div>

            </div>

          </OperationalCard>

          {/* =============================================== */}
          {/* ALERTS */}
          {/* =============================================== */}

          <OperationalCard

            eyebrow="Operational Alerts"

            title="Fleet Intelligence"

          >

            <div
              className="
                space-y-5
              "
            >

              <AlertCard

                icon={
                  <AlertTriangle className="h-5 w-5" />
                }

                title="Propshaft Risk Escalation"

                description="
                  Expedition survivability degraded under heavy articulation telemetry.
                "

                severity="critical"
              />

              <AlertCard

                icon={
                  <Gauge className="h-5 w-5" />
                }

                title="Readiness Stability"

                description="
                  Fleet operational readiness stable across telemetry cycle.
                "

                severity="success"
              />

              <AlertCard

                icon={
                  <CheckCircle2 className="h-5 w-5" />
                }

                title="Expedition Status"

                description="
                  Tactical deployment confidence operating within safe thresholds.
                "

                severity="info"
              />

            </div>

          </OperationalCard>

        </div>

      </div>

    </OperationalAppShell>
  )
}

// ============================================================
// TELEMETRY
// ============================================================

function TelemetryCard({

  icon,
  label,
  value,
  status

}: {

  icon: React.ReactNode

  label: string

  value: string

  status: string

}){

  return (

    <div
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
          justify-between
          gap-4
        "
      >

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            border
            border-slate-700
            bg-[#020817]
            text-[#38BDF8]
          "
        >
          {icon}
        </div>

        <div
          className="
            rounded-full
            border
            border-emerald-800
            bg-emerald-950/20
            px-3
            py-2
            text-[10px]
            font-black
            uppercase
            tracking-[0.18em]
            text-emerald-300
          "
        >
          {status}
        </div>

      </div>

      <div
        className="
          mt-6
          text-[36px]
          font-black
          tracking-[-0.06em]
          text-white
        "
      >
        {value}
      </div>

      <div
        className="
          mt-2
          text-[11px]
          font-black
          uppercase
          tracking-[0.18em]
          text-slate-500
        "
      >
        {label}
      </div>

    </div>
  )
}

// ============================================================
// METRIC
// ============================================================


