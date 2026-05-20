/* =====================================================
   JustDefenders Â©
   File:
   C:\dev\justdefenders\frontend\server\ueba-engine.js
===================================================== */

const { PrismaClient } =
require("@prisma/client")

const prisma =
new PrismaClient()

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS UEBA ENGINE")
console.log("BEHAVIOURAL ANALYTICS ACTIVE")
console.log("====================================")
console.log("")

async function analyse(){

  try {

    const telemetry =
    await prisma.telemetryEvent.findMany({

      take:100,

      orderBy:{

        createdAt:"desc"
      }
    })

    console.log(
      "Telemetry events:",
      telemetry.length
    )

    for(const event of telemetry){

      const entity =
      event.source || "UNKNOWN"

      let score = 10

      if(
        event.severity === "HIGH"
      ){

        score += 35
      }

      if(
        entity
        .toLowerCase()
        .includes("powershell")
      ){

        score += 25
      }

      if(
        entity
        .toLowerCase()
        .includes("credential")
      ){

        score += 30
      }

      let level = "LOW"

      if(score >= 70){

        level = "CRITICAL"

      } else if(score >= 50){

        level = "HIGH"

      } else if(score >= 30){

        level = "MEDIUM"
      }

      const existing =
      await prisma.uEBAEntityRisk.findFirst({

        where:{

          entityName:
          entity
        }
      })

      if(existing){

        await prisma.uEBAEntityRisk.update({

          where:{
            id:existing.id
          },

          data:{

            riskScore:
            score,

            riskLevel:
            level,

            lastActivity:
            new Date()
          }
        })

      } else {

        await prisma.uEBAEntityRisk.create({

          data:{

            entityType:"HOST",

            entityName:
            entity,

            riskScore:
            score,

            riskLevel:
            level,

            lastActivity:
            new Date()
          }
        })
      }

      if(score >= 50){

        const anomaly =
        await prisma.uEBAAnomaly.findFirst({

          where:{

            entityName:
            entity,

            anomalyType:
            "HIGH_RISK_BEHAVIOUR"
          }
        })

        if(!anomaly){

          await prisma.uEBAAnomaly.create({

            data:{

              entityType:"HOST",

              entityName:
              entity,

              anomalyType:
              "HIGH_RISK_BEHAVIOUR",

              severity:
              level,

              description:
              "Behavioural anomaly detected"
            }
          })

          console.log(
            "UEBA anomaly:",
            entity
          )
        }
      }
    }

  } catch(error){

    console.log("")
    console.log("====================================")
    console.log("UEBA ENGINE FAILURE")
    console.log("====================================")
    console.log(error)
    console.log("")
  }
}

setInterval(
  analyse,
  15000
)

analyse()
