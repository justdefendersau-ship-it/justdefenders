/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\ai\llm\llm-provider.js
===================================================== */

class LLMProvider {

  constructor(){

    this.provider =
    process.env.LLM_PROVIDER ||
    "mock"

    this.model =
    process.env.LLM_MODEL ||
    "gpt-enterprise"
  }

  async generate(prompt){

    return {

      provider:
      this.provider,

      model:
      this.model,

      response:
      "AI reasoning generated",

      confidence:
      92
    }
  }
}

module.exports =
new LLMProvider()