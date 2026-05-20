/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\supplier-runtime\supplier-runtime.js
   Timestamp:
   13 May 2026 22:30 (Sydney)
===================================================== */

const fs =
require("fs")

const path =
require("path")

console.log("")
console.log("====================================")
console.log("SUPPLIER OPERATIONAL RUNTIME")
console.log("LIVE SUPPLIER INTEGRATION ACTIVE")
console.log("====================================")
console.log("")

const supplierPath =
path.join(

  __dirname,
  "../../data/suppliers/live-sync/supplier-health.json"
)

function supplierRuntime(){

  try {

    const suppliers =
    JSON.parse(

      fs.readFileSync(
        supplierPath,
        "utf8"
      )
    )

    suppliers.forEach(

      item => {

        console.log({

          supplier:
          item.supplier,

          status:
          item.status,

          reliability:
          item.reliabilityScore,

          inventoryFreshness:
          item.inventoryFreshnessMinutes,

          timestamp:
          new Date().toISOString()
        })
      }
    )

  } catch(error){

    console.log({

      supplierFailure:
      error.message
    })
  }
}

setInterval(
  supplierRuntime,
  45000
)

supplierRuntime()