/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\search-engine\real-search-engine.js
   Timestamp:
   13 May 2026 12:05 (Sydney)
===================================================== */

const fs =
require("fs")

const path =
require("path")

console.log("")
console.log("====================================")
console.log("REAL SEARCH ENGINE")
console.log("COMMERCIAL SEARCH ACTIVE")
console.log("====================================")
console.log("")

const indexPath =
path.join(

  __dirname,
  "../../data/search/search-index.json"
)

function search(){

  try {

    const data =
    JSON.parse(

      fs.readFileSync(
        indexPath,
        "utf8"
      )
    )

    data.forEach(

      item => {

        console.log({

          query:
          item.query,

          supplier:
          item.supplier,

          relevance:
          item.relevanceScore,

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

      searchFailure:
      error.message
    })
  }
}

setInterval(
  search,
  45000
)

search()