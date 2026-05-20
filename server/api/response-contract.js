/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\api\response-contract.js
===================================================== */

function success(data){

  return {

    success:true,

    timestamp:
    new Date().toISOString(),

    data
  }
}

function failure(message){

  return {

    success:false,

    timestamp:
    new Date().toISOString(),

    error:message
  }
}

module.exports = {

  success,
  failure
}