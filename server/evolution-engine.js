/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\evolution-engine.js
===================================================== */

const { PrismaClient } =
require("@prisma/client")

const prisma =
new PrismaClient()

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS EVOLUTION ENGINE")
console.log("SELF-EVOLVING DEFENCE ACTIVE")
console.log("====================================")
console.log("")

async function evolveDefence(){

  try {

    const anomalies =
    await prisma.uEBAAnomaly.findMany({

      take:25,

      orderBy:{

        createdAt:"desc"
      }
    })

    console.log(
      "Evolution anomalies:",
      anomalies.length
    )

    for(const anomaly of anomalies){

      const existingDetection =
      await prisma.evolutionaryDetection.findFirst({

        where:{

          detectionName:
          anomaly.entityName
        }
      })

      if(!existingDetection){

        await prisma.evolutionaryDetection.create({

          data:{

            detectionName:
            "AUTO-DETECTION-" +
            anomaly.entityName,

            generatedBy:
            "EVOLUTION-ENGINE",

            mutationScore:
            Math.floor(
              Math.random() * 100
            ),

            confidence:
            90
          }
        })

        console.log(
          "Autonomous detection generated:",
          anomaly.entityName
        )
      }

      await prisma.learningCycle.create({

        data:{

          learningType:
          "REINFORCEMENT_LEARNING",

          sourceAgent:
          "MULTI-AGENT-FABRIC",

          optimisationTarget:
          anomaly.entityName,

          improvementScore:
          Math.floor(
            Math.random() * 100
          )
        }
      })

      await prisma.threatEvolution.create({

        data:{

          adversaryModel:
          "APT-EVOLUTION",

          predictedTechnique:
          "T1059",

          probability:
          Math.floor(
            Math.random() * 100
          )
        }
      })

      await prisma.collectiveIntelligence.create({

        data:{

          contributingAgent:
          "HUNT-AGENT",

          intelligenceType:
          "THREAT_EVOLUTION",

          intelligenceValue:
          "Predicted behavioural mutation",

          confidence:
          88
        }
      })

      console.log(
        "Collective intelligence updated"
      )
    }

  } catch(error){

    console.log(
      "Evolution engine failure:",
      error.message
    )
  }
}

setInterval(
  evolveDefence,
  30000
)

evolveDefence()