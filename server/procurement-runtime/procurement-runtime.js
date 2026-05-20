/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\procurement-runtime\procurement-runtime.js
   Timestamp:
   14 May 2026 01:30 (Sydney)
===================================================== */

const fs =
require("fs")

const path =
require("path")

console.log("")
console.log("====================================")
console.log("PROCUREMENT OPERATIONS")
console.log("REAL ORDERING ACTIVE")
console.log("====================================")
console.log("")

const trackingPath =
path.join(

  __dirname,
  "../../data/orders/tracking/order-tracking.json"
)

function procurementRuntime(){

  try {

    const orders =
    JSON.parse(

      fs.readFileSync(
        trackingPath,
        "utf8"
      )
    )

    orders.forEach(

      item => {

        console.log({

          order:
          item.orderId,

          supplier:
          item.supplier,

          status:
          item.status,

          eta:
          item.estimatedArrival,

          timestamp:
          new Date().toISOString()
        })
      }
    )

  } catch(error){

    console.log({

      procurementFailure:
      error.message
    })
  }
}

setInterval(
  procurementRuntime,
  45000
)

procurementRuntime()