/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\suppliers\threat-intel\threat-feed.js
===================================================== */

console.log("")
console.log("====================================")
console.log("THREAT INTELLIGENCE FEED")
console.log("ENRICHMENT ACTIVE")
console.log("====================================")
console.log("")

function simulate(){

  console.log({

    feed:
    "ThreatIntel",

    maliciousIPs:
    88,

    ransomwareIOCs:
    14,

    activeCampaigns:
    3,

    timestamp:
    new Date().toISOString()
  })
}

setInterval(
  simulate,
  60000
)

simulate()