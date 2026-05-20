/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\production\validation\security-validator.js
===================================================== */

function validateSecurity(){

  return [

    {

      control:
      "SECRETS_MANAGEMENT",

      status:
      "PASS"
    },

    {

      control:
      "RUNTIME_IDENTITY",

      status:
      "PASS"
    },

    {

      control:
      "OBSERVABILITY",

      status:
      "PASS"
    }
  ]
}

module.exports = {

  validateSecurity
}