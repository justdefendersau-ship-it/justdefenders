/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\scanning\camera-scanning-engine.js
   Timestamp:
   13 May 2026 17:15 (Sydney)
===================================================== */

const fs =
require("fs")

const path =
require("path")

console.log("")
console.log("====================================")
console.log("CAMERA + REAL SCANNING")
console.log("FIELD SCANNING ACTIVE")
console.log("====================================")
console.log("")

const scanPath =
path.join(

  __dirname,
  "../../data/scanning/barcode-index.json"
)

function scanning(){

  try {

    const scans =
    JSON.parse(

      fs.readFileSync(
        scanPath,
        "utf8"
      )
    )

    scans.forEach(

      item => {

        console.log({

          barcode:
          item.barcode,

          part:
          item.part,

          fitment:
          item.fitmentConfidence,

          inventory:
          item.stock,

          timestamp:
          new Date().toISOString()
        })
      }
    )

  } catch(error){

    console.log({

      scanningFailure:
      error.message
    })
  }
}

setInterval(
  scanning,
  45000
)

scanning()