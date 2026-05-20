/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\workflow-engine\workflow-engine.js
   Timestamp:
   13 May 2026 16:35 (Sydney)
===================================================== */

const fs =
require("fs")

const path =
require("path")

console.log("")
console.log("====================================")
console.log("REAL PRODUCT WORKFLOWS")
console.log("COMMERCIAL FLOWS ACTIVE")
console.log("====================================")
console.log("")

const garagePath =
path.join(

  __dirname,
  "../../data/workflows/garage-workflows.json"
)

function workflows(){

  try {

    const garage =
    JSON.parse(

      fs.readFileSync(
        garagePath,
        "utf8"
      )
    )

    garage.forEach(

      item => {

        console.log({

          vehicle:
          item.vehicle,

          faults:
          item.activeFaults,

          expedition:
          item.expeditionReady,

          suppliers:
          item.preferredSuppliers,

          timestamp:
          new Date().toISOString()
        })
      }
    )

  } catch(error){

    console.log({

      workflowFailure:
      error.message
    })
  }
}

setInterval(
  workflows,
  45000
)

workflows()