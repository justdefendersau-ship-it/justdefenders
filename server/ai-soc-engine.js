/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\ai-soc-engine.js
===================================================== */

const { PrismaClient } =
require("@prisma/client")

const prisma =
new PrismaClient()

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS AI SOC ENGINE")
console.log("AUTONOMOUS ANALYTICS ACTIVE")
console.log("====================================")
console.log("")

function generateNarrative(alert){

  let narrative =
  "AI ANALYSIS: "

  if(alert.severity === "HIGH"){

    narrative +=
    "High severity activity detected. "
  }

  narrative +=
  "Source: " +
  alert.source +
  ". "

  narrative +=
  "Rule: " +
  alert.ruleName +
  ". "

  narrative +=
  "Autonomous triage recommends analyst review."

  return narrative
}

async function analyse(){

  try {

    const alerts =
    await prisma.detectionAlert.findMany({

      take:50,

      orderBy:{

        createdAt:"desc"
      }
    })

    console.log(
      "AI processing alerts:",
      alerts.length
    )

    for(const alert of alerts){

      const existing =
      await prisma.caseAudit.findFirst({

        where:{

          action:
          alert.title
        }
      })

      if(existing){

        continue
      }

      const narrative =
      generateNarrative(alert)

      await prisma.caseAudit.create({

        data:{

          caseId:1,

          analyst:"AI-SOC",

          action:narrative
        }
      })

      console.log(
        "AI narrative created:",
        alert.title
      )
    }

  } catch(error){

    console.log(
      "AI engine failure:",
      error.message
    )
  }
}

setInterval(
  analyse,
  20000
)

analyse()