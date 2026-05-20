/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\ai-runtime-engine.js
===================================================== */

const llm =
require("./ai/llm/llm-provider")

const rag =
require("./ai/rag/rag-pipeline")

const confidence =
require("./ai/governance/confidence-engine")

console.log("")
console.log("====================================")
console.log("JUSTDEFENDERS AI RUNTIME")
console.log("REAL AI FOUNDATIONS ACTIVE")
console.log("====================================")
console.log("")

async function cognitiveLoop(){

  try {

    const enriched =
    await rag.enrich(
      "Analyse emerging threats"
    )

    const result =
    await llm.generate(
      JSON.stringify(enriched)
    )

    const scored =
    confidence.score(result)

    console.log(
      "AI reasoning complete:",
      scored.confidence
    )

  } catch(error){

    console.log(
      "AI runtime failure:",
      error.message
    )
  }
}

setInterval(
  cognitiveLoop,
  30000
)

cognitiveLoop()