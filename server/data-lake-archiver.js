/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\data-lake-archiver.js
===================================================== */

const fs =
require("fs")

const path =
require("path")

const { PrismaClient } =
require("@prisma/client")

const prisma =
new PrismaClient()

const ARCHIVE_DIR =
path.join(
  process.cwd(),
  "..",
  "data-lake",
  "archive"
)

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS DATA LAKE")
console.log("ARCHIVAL ENGINE ACTIVE")
console.log("====================================")
console.log("")

async function archiveTelemetry(){

  try {

    const telemetry =
    await prisma.telemetryEvent.findMany({

      take:100,

      orderBy:{

        createdAt:"asc"
      }
    })

    if(telemetry.length === 0){

      return
    }

    const filename =
    `archive-${Date.now()}.json`

    const filepath =
    path.join(
      ARCHIVE_DIR,
      filename
    )

    fs.writeFileSync(
      filepath,
      JSON.stringify(
        telemetry,
        null,
        2
      )
    )

    for(const event of telemetry){

      await prisma.historicalEvent.create({

        data:{

          source:
          event.source,

          severity:
          event.severity,

          eventType:
          "telemetry",

          payload:
          JSON.stringify(event),

          indexed:true,

          archived:true
        }
      })
    }

    console.log(
      "Archived telemetry:",
      telemetry.length
    )

  } catch(error){

    console.log(
      "Archive failure"
    )
  }
}

setInterval(
  archiveTelemetry,
  15000
)

archiveTelemetry()