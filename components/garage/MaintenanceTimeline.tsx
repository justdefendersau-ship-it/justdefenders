// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\components\garage\MaintenanceTimeline.tsx
// Timestamp: 15 May 2026 20:05 Sydney
// ====================================================================

"use client"

interface TimelineEvent {

  id: string

  title: string

  date: string

  category: string

  description?: string
}

interface Props {

  events:
    TimelineEvent[]
}

export default function MaintenanceTimeline({
  events
}: Props) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
      "
    >

      <div
        className="
          mb-6
          text-2xl
          font-bold
          text-white
        "
      >

        Maintenance Timeline

      </div>

      <div
        className="
          space-y-6
        "
      >

        {
          events.map(
            event => (

              <div
                key={
                  event.id
                }

                className="
                  flex
                  gap-4
                "
              >

                <div
                  className="
                    mt-2
                    h-3
                    w-3
                    rounded-full
                    bg-green-500
                  "
                />

                <div>

                  <div
                    className="
                      text-lg
                      font-semibold
                      text-white
                    "
                  >

                    {
                      event.title
                    }

                  </div>

                  <div
                    className="
                      text-sm
                      text-zinc-400
                    "
                  >

                    {
                      event.date
                    }

                    {" • "}

                    {
                      event.category
                    }

                  </div>

                  <div
                    className="
                      mt-2
                      text-zinc-300
                    "
                  >

                    {
                      event.description
                    }

                  </div>

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}