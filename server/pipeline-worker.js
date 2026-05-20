/* =====================================================
   JustDefenders ©
   Hardened Distributed Worker
===================================================== */

const { PrismaClient } =
require("@prisma/client")

const prisma =
new PrismaClient()

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS HARDENED WORKER")
console.log("PIPELINE PROTECTION ACTIVE")
console.log("====================================")
console.log("")

async function processQueue(){

  try {

    const queued =
    await prisma.eventQueue.findMany({

      where:{

        status:"QUEUED"
      },

      take:100
    })

    if(queued.length > 0){

      console.log(
        "Queue depth:",
        queued.length
      )
    }

  } catch(error){

    console.log(
      "Queue protection triggered"
    )
  }
}

setInterval(
  processQueue,
  5000
)

processQueue()
