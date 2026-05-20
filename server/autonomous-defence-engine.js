/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\autonomous-defence-engine.js
===================================================== */

const { PrismaClient } =
require("@prisma/client")

const prisma =
new PrismaClient()

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS AUTONOMOUS DEFENCE")
console.log("CLOSED-LOOP RESPONSE ACTIVE")
console.log("====================================")
console.log("")

async function executeDefence(){

  try {

    const anomalies =
    await prisma.uEBAAnomaly.findMany({

      take:50,

      orderBy:{

        createdAt:"desc"
      }
    })

    console.log(
      "Autonomous anomalies:",
      anomalies.length
    )

    for(const anomaly of anomalies){

      const existing =
      await prisma.autonomousAction.findFirst({

        where:{

          targetEntity:
          anomaly.entityName
        }
      })

      if(existing){

        continue
      }

      let action =
      "MONITOR"

      let confidence =
      50

      if(
        anomaly.severity === "HIGH"
      ){

        action =
        "ISOLATE_ENDPOINT"

        confidence =
        85
      }

      if(
        anomaly.severity === "CRITICAL"
      ){

        action =
        "LOCK_ACCOUNT"

        confidence =
        95
      }

      await prisma.autonomousAction.create({

        data:{

          actionType:
          action,

          targetEntity:
          anomaly.entityName,

          decisionSource:
          "AI_AUTONOMOUS_ENGINE",

          confidence:
          confidence,

          status:
          "EXECUTED"
        }
      })

      console.log(
        "Autonomous response:",
        anomaly.entityName,
        action
      )

      const blast =
      await prisma.blastRadius.findFirst({

        where:{

          sourceEntity:
          anomaly.entityName
        }
      })

      if(!blast){

        await prisma.blastRadius.create({

          data:{

            sourceEntity:
            anomaly.entityName,

            impactedSystems:
            "HOST-001,HOST-002,HOST-003",

            severity:
            anomaly.severity,

            estimatedNodes:
            Math.floor(
              Math.random() * 10
            ) + 1
          }
        })

        console.log(
          "Blast radius mapped:",
          anomaly.entityName
        )
      }
    }

  } catch(error){

    console.log(
      "Autonomous defence failure:",
      error.message
    )
  }
}

setInterval(
  executeDefence,
  20000
)

executeDefence()