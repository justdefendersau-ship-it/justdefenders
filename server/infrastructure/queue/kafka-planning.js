/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\infrastructure\queue\kafka-planning.js
===================================================== */

module.exports = {

  topics:[

    "telemetry-events",
    "detection-alerts",
    "ueba-events",
    "threat-intelligence",
    "graph-events",
    "autonomous-response"
  ],

  retentionHours:72,

  replicationFactor:3
}