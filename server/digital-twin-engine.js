/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\digital-twin-engine.js
===================================================== */

const { PrismaClient } =
require("@prisma/client")

const prisma =
new PrismaClient()

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS DIGITAL TWIN")
console.log("ADVERSARY SIMULATION ACTIVE")
console.log("====================================")
console.log("")

async function simulateAdversary(){

  try {

    const graphNodes =
    await prisma.graphNode.findMany({

      take:20
    })

    console.log(
      "Twin graph nodes:",
      graphNodes.length
    )

    for(const node of graphNodes){

      const existingAsset =
      await prisma.digitalTwinAsset.findFirst({

        where:{

          hostname:
          node.label
        }
      })

      if(!existingAsset){

        await prisma.digitalTwinAsset.create({

          data:{

            hostname:
            node.label,

            assetType:
            "WORKSTATION",

            operatingSystem:
            "Windows 11",

            criticality:
            "HIGH",

            exposureScore:
            Math.floor(
              Math.random() * 100
            )
          }
        })

        console.log(
          "Twin asset modelled:",
          node.label
        )
      }

      const existingSimulation =
      await prisma.adversarySimulation.findFirst({

        where:{

          simulationName:
          node.label
        }
      })

      if(!existingSimulation){

        await prisma.adversarySimulation.create({

          data:{

            simulationName:
            "Attack Simulation - " +
            node.label,

            adversaryProfile:
            "APT-SIMULATION",

            attackTechnique:
            "T1021",

            successProbability:
            Math.floor(
              Math.random() * 100
            ),

            status:
            "COMPLETED"
          }
        })

        console.log(
          "Adversary simulation complete:",
          node.label
        )
      }

      const exposure =
      await prisma.exposurePath.findFirst({

        where:{

          sourceAsset:
          node.label
        }
      })

      if(!exposure){

        await prisma.exposurePath.create({

          data:{

            sourceAsset:
            node.label,

            targetAsset:
            "DOMAIN-CONTROLLER",

            attackPath:
            "LATERAL_MOVEMENT",

            exposureRisk:
            "HIGH"
          }
        })

        console.log(
          "Exposure path created:",
          node.label
        )
      }
    }

    const posture =
    await prisma.securityPosture.findFirst({

      where:{

        postureCategory:
        "OVERALL_SECURITY"
      }
    })

    if(!posture){

      await prisma.securityPosture.create({

        data:{

          postureCategory:
          "OVERALL_SECURITY",

          score:72,

          recommendation:
          "Increase endpoint segmentation and adaptive controls"
        }
      })

      console.log(
        "Security posture calculated"
      )
    }

  } catch(error){

    console.log(
      "Digital twin failure:",
      error.message
    )
  }
}

setInterval(
  simulateAdversary,
  25000
)

simulateAdversary()