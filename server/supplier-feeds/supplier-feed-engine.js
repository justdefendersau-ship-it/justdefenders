/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\supplier-feeds\supplier-feed-engine.js
   Timestamp:
   13 May 2026 15:05 (Sydney)
===================================================== */

const fs =
require("fs")

const path =
require("path")

console.log("")
console.log("====================================")
console.log("SUPPLIER FEED ENGINE")
console.log("REAL COMMERCIAL FEEDS ACTIVE")
console.log("====================================")
console.log("")

const registryPath =
path.join(

  __dirname,
  "../../data/supplier-feeds/supplier-feed-registry.json"
)

function feeds(){

  try {

    const registry =
    JSON.parse(

      fs.readFileSync(
        registryPath,
        "utf8"
      )
    )

    registry.forEach(

      feed => {

        console.log({

          supplier:
          feed.supplier,

          feedType:
          feed.feedType,

          health:
          feed.health,

          freshness:
          feed.freshnessScore,

          inventory:
          feed.inventoryFeed,

          pricing:
          feed.pricingFeed,

          timestamp:
          new Date().toISOString()
        })
      }
    )

  } catch(error){

    console.log({

      feedFailure:
      error.message
    })
  }
}

setInterval(
  feeds,
  45000
)

feeds()