/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\ai\governance\agent-governance.js
===================================================== */

module.exports = {

  maxAutonomyLevel:3,

  requireApproval:true,

  confidenceThreshold:85,

  restrictedActions:[

    "delete_data",
    "shutdown_runtime",
    "modify_schema"
  ]
}