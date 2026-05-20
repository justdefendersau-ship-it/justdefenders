/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\ux\rbac-engine.js
===================================================== */

const roles = {

  ADMIN:[
    "ALL"
  ],

  SOC_ANALYST:[
    "INVESTIGATE",
    "RESPOND",
    "VIEW_ALERTS"
  ],

  EXECUTIVE:[
    "VIEW_REPORTS",
    "VIEW_RISK"
  ]
}

function canAccess(
  role,
  permission
){

  if(
    !roles[role]
  ){

    return false
  }

  if(
    roles[role].includes("ALL")
  ){

    return true
  }

  return roles[role]
  .includes(permission)
}

module.exports = {

  canAccess
}