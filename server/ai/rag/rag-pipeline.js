/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\ai\rag\rag-pipeline.js
===================================================== */

const memory =
require("../memory/vector-memory")

async function retrieve(query){

  return memory.search(query)
}

async function enrich(prompt){

  const context =
  await retrieve(prompt)

  return {

    prompt,

    context
  }
}

module.exports = {

  retrieve,
  enrich
}