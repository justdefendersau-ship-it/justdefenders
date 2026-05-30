"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\notifications\OperationalNotificationDashboard.tsx
//
// Timestamp:
// 27 May 2026 20:00 Sydney
//
// PURPOSE:
// Operational notification dashboard.
// ====================================================================

export default function OperationalNotificationDashboard(){

  const [
    notifications,
    setNotifications
  ] = useState<any[]>([])

  // ================================================================
  // LOAD
  // ================================================================

  async function loadNotifications(){

    try {

      const response =
        await fetch(

          "/api/notifications"
        )

      const result =
        await response.json()

      setNotifications(
        result.notifications || []
      )

    } catch(error){

      console.error(
        error
      )
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    loadNotifications()

  },[])

  // ================================================================
  // BORDER
  // ================================================================

  function getBorderColour(
    severity:string
  ){

    switch(severity){

      case "HIGH":
        return "border-red-500"

      case "MEDIUM":
        return "border-yellow-500"

      default:
        return "border-green-500"
    }
  }

  // ================================================================
  // PAGE
  // ================================================================

  return (

    <div
      className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-6
      "
    >

      <div
        className="
          text-2xl
          font-bold
          mb-8
        "
      >

        Operational Notifications

      </div>

      {/* ============================================================
          EMPTY
      ============================================================ */}

      {notifications.length === 0 && (

        <div
          className="
            text-zinc-400
          "
        >

          No operational notifications.

        </div>
      )}

      {/* ============================================================
          LIST
      ============================================================ */}

      <div
        className="
          space-y-4
        "
      >

        {notifications.map(
          (
            notification,
            index
          ) => (

            <div

              key={index}

              className={`
                border
                rounded-xl
                p-4
                bg-black
                ${getBorderColour(
                  notification.severity
                )}
              `}
            >

              <div
                className="
                  flex
                  justify-between
                  items-center
                  mb-3
                "
              >

                <div
                  className="
                    text-lg
                    font-bold
                  "
                >

                  {notification.title}

                </div>

                <div
                  className="
                    text-xs
                    bg-zinc-800
                    px-3
                    py-1
                    rounded-full
                  "
                >

                  {notification.category}

                </div>

              </div>

              <div
                className="
                  text-zinc-300
                  text-sm
                  mb-3
                "
              >

                {notification.message}

              </div>

              <div
                className="
                  text-xs
                  text-zinc-500
                "
              >

                {new Date(
                  notification.timestamp
                ).toLocaleString()}

              </div>

            </div>
          )
        )}

      </div>

    </div>
  )
}