/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\ux\investigation-assistant.js
===================================================== */

async function assist(alert){

  return {

    summary:
    "AI investigation guidance generated",

    recommendations:[

      "Review correlated telemetry",

      "Analyse behavioural anomalies",

      "Review graph relationships"
    ],

    confidence:91
  }
}

module.exports = {

  assist
}