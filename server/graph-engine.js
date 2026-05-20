/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\graph-engine.js
===================================================== */

const { PrismaClient } =
require("@prisma/client")

const prisma =
new PrismaClient()

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS GRAPH ENGINE")
console.log("ATTACK PATH ANALYTICS ACTIVE")
console.log("====================================")
console.log("")

async function buildGraph(){

  try {

    const entities =
    await prisma.uEBAEntityRisk.findMany()

    console.log(
      "Graph entities:",
      entities.length
    )

    for(const entity of entities){

      const existing =
      await prisma.graphNode.findFirst({

        where:{

          entityId:
          entity.entityName
        }
      })

      if(!existing){

        await prisma.graphNode.create({

          data:{

            entityId:
            entity.entityName,

            entityType:
            entity.entityType,

            label:
            entity.entityName,

            riskScore:
            entity.riskScore
          }
        })

        console.log(
          "Graph node created:",
          entity.entityName
        )
      }
    }

    const nodes =
    await prisma.graphNode.findMany()

    for(let i=0;i<nodes.length-1;i++){

      const source =
      nodes[i]

      const target =
      nodes[i+1]

      const existing =
      await prisma.graphEdge.findFirst({

        where:{

          sourceNode:
          source.label,

          targetNode:
          target.label
        }
      })

      if(!existing){

        await prisma.graphEdge.create({

          data:{

            sourceNode:
            source.label,

            targetNode:
            target.label,

            relationship:
            "OBSERVED_ACTIVITY",

            confidence:75
          }
        })

        console.log(
          "Graph edge created:",
          source.label,
          "->",
          target.label
        )
      }

      const path =
      await prisma.attackPath.findFirst({

        where:{

          sourceEntity:
          source.label,

          targetEntity:
          target.label
        }
      })

      if(!path){

        await prisma.attackPath.create({

          data:{

            pathName:
            "Potential Lateral Movement",

            severity:
            "MEDIUM",

            sourceEntity:
            source.label,

            targetEntity:
            target.label,

            technique:
            "T1021"
          }
        })

        console.log(
          "Attack path identified:",
          source.label,
          "->",
          target.label
        )
      }
    }

  } catch(error){

    console.log(
      "Graph engine failure:",
      error.message
    )
  }
}

setInterval(
  buildGraph,
  20000
)

buildGraph()