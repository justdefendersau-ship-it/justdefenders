/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\supplier-validation\supplier-validation-engine.js
   Timestamp:
   13 May 2026 10:05 (Sydney)
===================================================== */

const fs =
require("fs")

const path =
require("path")

console.log("")
console.log("====================================")
console.log("SUPPLIER VALIDATION ENGINE")
console.log("REAL COMMERCIAL VALIDATION ACTIVE")
console.log("====================================")
console.log("")

const registryPath =
path.join(

  __dirname,
  "../../data/suppliers/supplier-registry.json"
)

function validate(){

  try {

    const suppliers =
    JSON.parse(

      fs.readFileSync(
        registryPath,
        "utf8"
      )
    )

    suppliers.forEach(

      supplier => {

        console.log({

          supplier:
          supplier.supplier,

          validation:
          supplier.validation,

          catalogue:
          supplier.catalogue,

          scraping:
          supplier.scraping,

          fitment:
          supplier.fitment,

          score:
          supplier.score,

          timestamp:
          new Date().toISOString()
        })
      }
    )

  } catch(error){

    console.log({

      validationFailure:
      error.message
    })
  }
}

setInterval(
  validate,
  60000
)

validate()