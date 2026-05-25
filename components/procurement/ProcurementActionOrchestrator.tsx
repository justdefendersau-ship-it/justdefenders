/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\procurement\ProcurementActionOrchestrator.tsx
 *
 * Timestamp:
 * 24 May 2026 07:18 Sydney
 *
 * PURPOSE:
 * Procurement Action Orchestration Layer
 *
 * STRATEGY:
 * PASS 46B.6 — Procurement Action Orchestration
 *
 * OBJECTIVES:
 * - procurement workflow states
 * - tactical action orchestration
 * - compare workflow persistence
 * - operational confirmations
 * - federation acknowledgements
 * - procurement queue continuity
 * - intelligence retrieval realism
 * - command-centre procurement workflows
 *
 * ============================================================
 */

"use client"

import {

  Activity,
  CheckCircle2,
  Clock3,
  Database,
  LoaderCircle,
  Radar,
  Shield,
  ShoppingCart,
  SplitSquareVertical,
  Truck,
  X

} from "lucide-react"

import {

  AnimatePresence,
  motion

} from "framer-motion"

import {

  createContext,
  useContext,
  useMemo,
  useState

} from "react"

// ============================================================
// TYPES
// ============================================================

type WorkflowState =

  "IDLE"
  |
  "VALIDATING"
  |
  "ACQUIRING"
  |
  "CONFIRMED"
  |
  "COMPARE"
  |
  "INTELLIGENCE"

interface QueueItem {

  id: string

  supplier: string

  part: string

  state: WorkflowState
}

interface ProcurementActionContextType {

  queue: QueueItem[]

  compare: QueueItem[]

  activeNotice: string | null

  addToQueue: (
    item: QueueItem
  ) => void

  startCompare: (
    item: QueueItem
  ) => void

  retrieveIntelligence: (
    item: QueueItem
  ) => void

  clearNotice: () => void
}

// ============================================================
// CONTEXT
// ============================================================

const ProcurementActionContext =
  createContext<ProcurementActionContextType | null>(null)

// ============================================================
// PROVIDER
// ============================================================

export function ProcurementActionProvider({

  children

}: {

  children: React.ReactNode

}){

  // ==========================================================
  // STATE
  // ==========================================================

  const [

    queue,

    setQueue

  ] = useState<QueueItem[]>([])

  const [

    compare,

    setCompare

  ] = useState<QueueItem[]>([])

  const [

    activeNotice,

    setActiveNotice

  ] = useState<string | null>(null)

  // ==========================================================
  // QUEUE
  // ==========================================================

  function addToQueue(
    item: QueueItem
  ){

    const queuedItem = {

      ...item,

      state:
        "VALIDATING" as WorkflowState
    }

    setQueue(prev => [

      queuedItem,
      ...prev
    ])

    setActiveNotice(
      "Federation procurement validation initiated."
    )

    setTimeout(() => {

      setQueue(prev =>
        prev.map(q =>

          q.id === item.id

          ?

          {

            ...q,

            state:
              "ACQUIRING"
          }

          :

          q
        )
      )

      setActiveNotice(
        "Operational procurement acquisition active."
      )

    }, 1400)

    setTimeout(() => {

      setQueue(prev =>
        prev.map(q =>

          q.id === item.id

          ?

          {

            ...q,

            state:
              "CONFIRMED"
          }

          :

          q
        )
      )

      setActiveNotice(
        "Federation procurement confirmed."
      )

    }, 3200)
  }

  // ==========================================================
  // COMPARE
  // ==========================================================

  function startCompare(
    item: QueueItem
  ){

    setCompare(prev => {

      if(
        prev.find(
          p => p.id === item.id
        )
      ){

        return prev
      }

      return [

        ...prev,
        {

          ...item,

          state:
            "COMPARE"
        }
      ]
    })

    setActiveNotice(
      "Tactical comparison workflow active."
    )
  }

  // ==========================================================
  // INTELLIGENCE
  // ==========================================================

  function retrieveIntelligence(
    item: QueueItem
  ){

    setActiveNotice(
      `Retrieving operational intelligence for ${item.part}.`
    )

    setTimeout(() => {

      setActiveNotice(
        "Federation telemetry synchronized."
      )

    }, 1800)
  }

  // ==========================================================
  // CLEAR
  // ==========================================================

  function clearNotice(){

    setActiveNotice(null)
  }

  // ==========================================================
  // VALUE
  // ==========================================================

  const value =
    useMemo(() => ({

      queue,
      compare,
      activeNotice,
      addToQueue,
      startCompare,
      retrieveIntelligence,
      clearNotice

    }), [

      queue,
      compare,
      activeNotice
    ])

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <ProcurementActionContext.Provider
      value={value}
    >

      {children}

      <ProcurementQueuePanel />

      <CompareTray />

      <OperationalNoticeOverlay />

    </ProcurementActionContext.Provider>
  )
}

// ============================================================
// HOOK
// ============================================================

export function useProcurementActions(){

  const context =
    useContext(
      ProcurementActionContext
    )

  if(!context){

    throw new Error(

      "useProcurementActions must be used inside ProcurementActionProvider"
    )
  }

  return context
}

// ============================================================
// ACTION BUTTONS
// ============================================================

export function ProcurementActionButtons({

  id,
  supplier,
  part

}: {

  id: string

  supplier: string

  part: string

}){

  const {

    addToQueue,
    startCompare,
    retrieveIntelligence

  } = useProcurementActions()

  const item = {

    id,
    supplier,
    part,
    state:
      "IDLE" as WorkflowState
  }

  return (

    <div
      className="
        flex
        flex-wrap
        items-center
        gap-3
      "
    >

      {/* ==================================================== */}
      {/* PROCUREMENT */}
      {/* ==================================================== */}

      <button

        onClick={() =>
          addToQueue(item)
        }

        className="
          jd-button-motion
          inline-flex
          items-center
          gap-3
          rounded-[16px]
          border
          border-cyan-800
          bg-cyan-600
          px-5
          py-3
          text-[11px]
          font-black
          uppercase
          tracking-[0.16em]
          text-white
          transition-all
          hover:bg-cyan-500
        "
      >

        <ShoppingCart className="h-4 w-4" />

        Acquire

      </button>

      {/* ==================================================== */}
      {/* COMPARE */}
      {/* ==================================================== */}

      <button

        onClick={() =>
          startCompare(item)
        }

        className="
          jd-button-motion
          inline-flex
          items-center
          gap-3
          rounded-[16px]
          border
          border-slate-700
          bg-[#020817]
          px-5
          py-3
          text-[11px]
          font-black
          uppercase
          tracking-[0.16em]
          text-slate-300
          transition-all
          hover:border-slate-600
          hover:text-white
        "
      >

        <SplitSquareVertical className="h-4 w-4" />

        Compare

      </button>

      {/* ==================================================== */}
      {/* INTELLIGENCE */}
      {/* ==================================================== */}

      <button

        onClick={() =>
          retrieveIntelligence(item)
        }

        className="
          jd-button-motion
          inline-flex
          items-center
          gap-3
          rounded-[16px]
          border
          border-purple-800
          bg-purple-950/20
          px-5
          py-3
          text-[11px]
          font-black
          uppercase
          tracking-[0.16em]
          text-purple-300
          transition-all
          hover:border-purple-700
        "
      >

        <Radar className="h-4 w-4" />

        Intelligence

      </button>

    </div>
  )
}

// ============================================================
// QUEUE
// ============================================================

function ProcurementQueuePanel(){

  const {

    queue

  } = useProcurementActions()

  return (

    <AnimatePresence>

      {

        queue.length > 0

        &&

        <motion.div

          initial={{

            opacity: 0,
            y: 20
          }}

          animate={{

            opacity: 1,
            y: 0
          }}

          exit={{

            opacity: 0,
            y: 20
          }}

          className="
            fixed
            bottom-5
            right-5
            z-[140]
            w-[380px]
            overflow-hidden
            rounded-[28px]
            border
            border-slate-800
            bg-[#07101F]
            shadow-[0_0_80px_rgba(0,0,0,0.50)]
          "
        >

          {/* =============================================== */}
          {/* HEADER */}
          {/* =============================================== */}

          <div
            className="
              border-b
              border-slate-800
              bg-[#020817]
              px-5
              py-4
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

              <div>

                <div
                  className="
                    jd-section-label
                  "
                >
                  Procurement Queue
                </div>

                <div
                  className="
                    jd-heading
                    mt-2
                  "
                >
                  Tactical Acquisition Workflow
                </div>

              </div>

              <div
                className="
                  jd-live-pulse
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-cyan-800
                  bg-cyan-950/20
                  text-cyan-300
                "
              >

                <Database className="h-5 w-5" />

              </div>

            </div>

          </div>

          {/* =============================================== */}
          {/* ITEMS */}
          {/* =============================================== */}

          <div
            className="
              max-h-[420px]
              overflow-auto
              p-4
              space-y-3
            "
          >

            {

              queue.map(item => (

                <QueueItemCard
                  key={item.id}
                  item={item}
                />
              ))
            }

          </div>

        </motion.div>
      }

    </AnimatePresence>
  )
}

// ============================================================
// QUEUE ITEM
// ============================================================

function QueueItemCard({

  item

}: {

  item: QueueItem

}){

  return (

    <div
      className="
        rounded-[20px]
        border
        border-slate-800
        bg-[#020817]
        p-4
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
              jd-heading
            "
          >
            {item.part}
          </div>

          <div
            className="
              jd-muted
              mt-2
            "
          >
            {item.supplier}
          </div>

        </div>

        <WorkflowStateBadge
          state={item.state}
        />

      </div>

    </div>
  )
}

// ============================================================
// BADGE
// ============================================================

function WorkflowStateBadge({

  state

}: {

  state: WorkflowState

}){

  if(state === "VALIDATING"){

    return (

      <div
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-amber-800
          bg-amber-950/20
          px-3
          py-2
          text-[10px]
          font-black
          uppercase
          tracking-[0.16em]
          text-amber-300
        "
      >

        <LoaderCircle
          className="
            h-3.5
            w-3.5
            animate-spin
          "
        />

        Validating

      </div>
    )
  }

  if(state === "ACQUIRING"){

    return (

      <div
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-cyan-800
          bg-cyan-950/20
          px-3
          py-2
          text-[10px]
          font-black
          uppercase
          tracking-[0.16em]
          text-cyan-300
        "
      >

        <Truck className="h-3.5 w-3.5" />

        Acquiring

      </div>
    )
  }

  if(state === "CONFIRMED"){

    return (

      <div
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-emerald-800
          bg-emerald-950/20
          px-3
          py-2
          text-[10px]
          font-black
          uppercase
          tracking-[0.16em]
          text-emerald-300
        "
      >

        <CheckCircle2 className="h-3.5 w-3.5" />

        Confirmed

      </div>
    )
  }

  return null
}

// ============================================================
// COMPARE
// ============================================================

function CompareTray(){

  const {

    compare

  } = useProcurementActions()

  return (

    <AnimatePresence>

      {

        compare.length > 0

        &&

        <motion.div

          initial={{

            opacity: 0,
            y: 20
          }}

          animate={{

            opacity: 1,
            y: 0
          }}

          exit={{

            opacity: 0,
            y: 20
          }}

          className="
            fixed
            bottom-5
            left-1/2
            z-[140]
            flex
            -translate-x-1/2
            items-center
            gap-4
            rounded-[24px]
            border
            border-slate-800
            bg-[#020817]
            px-5
            py-4
            shadow-[0_0_80px_rgba(0,0,0,0.50)]
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <SplitSquareVertical
              className="
                h-5
                w-5
                text-cyan-300
              "
            />

            <div>

              <div
                className="
                  jd-section-label
                "
              >
                Tactical Compare
              </div>

              <div
                className="
                  jd-heading
                  mt-1
                "
              >
                {compare.length} items selected
              </div>

            </div>

          </div>

          <button
            className="
              jd-button-motion
              rounded-[14px]
              border
              border-cyan-800
              bg-cyan-600
              px-4
              py-2
              text-[11px]
              font-black
              uppercase
              tracking-[0.14em]
              text-white
            "
          >
            Compare Federation
          </button>

        </motion.div>
      }

    </AnimatePresence>
  )
}

// ============================================================
// NOTICE
// ============================================================

function OperationalNoticeOverlay(){

  const {

    activeNotice,
    clearNotice

  } = useProcurementActions()

  return (

    <AnimatePresence>

      {

        activeNotice

        &&

        <motion.div

          initial={{

            opacity: 0,
            y: -20
          }}

          animate={{

            opacity: 1,
            y: 0
          }}

          exit={{

            opacity: 0,
            y: -20
          }}

          className="
            fixed
            left-1/2
            top-5
            z-[150]
            flex
            -translate-x-1/2
            items-center
            gap-4
            rounded-[24px]
            border
            border-cyan-800
            bg-[#07101F]
            px-5
            py-4
            shadow-[0_0_80px_rgba(0,0,0,0.50)]
          "
        >

          <div
            className="
              jd-live-pulse
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-cyan-800
              bg-cyan-950/20
              text-cyan-300
            "
          >

            <Shield className="h-5 w-5" />

          </div>

          <div>

            <div
              className="
                jd-section-label
              "
            >
              Operational Confirmation
            </div>

            <div
              className="
                jd-heading
                mt-2
              "
            >
              {activeNotice}
            </div>

          </div>

          <button

            onClick={clearNotice}

            className="
              text-slate-500
              transition-colors
              hover:text-white
            "
          >

            <X className="h-5 w-5" />

          </button>

        </motion.div>
      }

    </AnimatePresence>
  )
}