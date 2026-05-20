const { PrismaClient } =
require("@prisma/client")

const prisma =
new PrismaClient()

console.log("")
console.log("====================================")
console.log("THREAT INTELLIGENCE ENGINE")
console.log("IOC CORRELATION ACTIVE")
console.log("====================================")
console.log("")

async function correlate(){

  try {

    const telemetry =
    await prisma.telemetryEvent.findMany({

      take:50,

      orderBy:{

        createdAt:"desc"
      }
    })

    const iocs =
    await prisma.threatIOC.findMany()

    for(const event of telemetry){

      for(const ioc of iocs){

        if(

          event.source
          .toLowerCase()

          .includes(

            ioc.value
            .toLowerCase()
          )
        ){

          const existing =
          await prisma.intelligenceHit.findFirst({

            where:{

              telemetryId:
              event.id,

              iocId:
              ioc.id
            }
          })

          if(!existing){

            await prisma.intelligenceHit.create({

              data:{

                telemetryId:
                event.id,

                iocId:
                ioc.id,

                source:
                event.source,

                severity:
                ioc.severity,

                matchedValue:
                ioc.value
              }
            })

            console.log(
              "IOC MATCH:",
              ioc.value
            )
          }
        }
      }
    }

  } catch(error){

    console.log(
      "TIP correlation failure"
    )
  }
}

setInterval(
  correlate,
  10000
)

correlate()
