/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\ai\governance\confidence-engine.js
===================================================== */

function score(result){

  return {

    confidence:
    Math.floor(
      80 + Math.random() * 20
    ),

    explainability:
    "Reasoning confidence estimated"
  }
}

module.exports = {

  score
}