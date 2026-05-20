/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\multi-agent-engine.js
===================================================== */

const { PrismaClient } =
require("@prisma/client")

const prisma =
new PrismaClient()

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS MULTI-AGENT FABRIC")
console.log("SWARM INTELLIGENCE ACTIVE")
console.log("====================================")
console.log("")

const AGENTS = [

  {
    name:"TRIAGE-AGENT",
    role:"INCIDENT_TRIAGE"
  },

  {
    name:"HUNT-AGENT",
    role:"THREAT_HUNTING"
  },

  {
    name:"MALWARE-AGENT",
    role:"MALWARE_ANALYSIS"
  },

  {
    name:"RESPONSE-AGENT",
    role:"RESPONSE_COORDINATION"
  },

  {
    name:"EXECUTIVE-AGENT",
    role:"EXECUTIVE_REPORTING"
  }
]

async function initialiseAgents(){

  for(const agent of AGENTS){

    const existing =
    await prisma.aISecurityAgent.findFirst({

      where:{

        agentName:
        agent.name
      }
    })

    if(!existing){

      await prisma.aISecurityAgent.create({

        data:{

          agentName:
          agent.name,

          agentRole:
          agent.role,

          status:
          "ONLINE",

          currentTask:
          "IDLE",

          confidence:
          90
        }
      })

      console.log(
        "AI agent online:",
        agent.name
      )
    }
  }
}

async function orchestrateAgents(){

  try {

    const alerts =
    await prisma.detectionAlert.findMany({

      take:10,

      orderBy:{

        createdAt:"desc"
      }
    })

    console.log(
      "Agent orchestration alerts:",
      alerts.length
    )

    for(const alert of alerts){

      const existingTask =
      await prisma.agentTask.findFirst({

        where:{

          taskDescription:
          alert.title
        }
      })

      if(existingTask){

        continue
      }

      const triageTask =
      await prisma.agentTask.create({

        data:{

          assignedAgent:
          "TRIAGE-AGENT",

          taskType:
          "TRIAGE",

          taskDescription:
          alert.title,

          status:
          "COMPLETED",

          priority:
          alert.severity
        }
      })

      console.log(
        "Triage task completed:",
        alert.title
      )

      await prisma.agentMemory.create({

        data:{

          agentName:
          "TRIAGE-AGENT",

          memoryType:
          "INCIDENT_MEMORY",

          memoryContent:
          "Processed alert: " +
          alert.title
        }
      })

      await prisma.investigationChain.create({

        data:{

          chainName:
          "Investigation-" +
          alert.id,

          originatingAgent:
          "TRIAGE-AGENT",

          executionState:
          "COMPLETED"
        }
      })

      console.log(
        "Investigation chain executed:",
        alert.title
      )
    }

  } catch(error){

    console.log(
      "Multi-agent failure:",
      error.message
    )
  }
}

initialiseAgents()

setInterval(
  orchestrateAgents,
  25000
)

orchestrateAgents()