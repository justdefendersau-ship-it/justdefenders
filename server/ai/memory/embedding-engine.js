/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\ai\memory\embedding-engine.js
===================================================== */

function generateEmbedding(text){

  return {

    dimensions:1536,

    vector:
    Array(10).fill(0.5),

    source:text
  }
}

module.exports = {

  generateEmbedding
}