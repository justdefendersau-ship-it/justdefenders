/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\platform\contracts\service-contract.js
===================================================== */

module.exports = {

  requiredFields:[

    "name",
    "status",
    "lastHeartbeat"
  ],

  validStates:[

    "STARTING",
    "ONLINE",
    "STOPPED",
    "FAILED"
  ]
}