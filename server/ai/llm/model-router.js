/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\ai\llm\model-router.js
===================================================== */

class ModelRouter {

  route(task){

    switch(task){

      case "analysis":

        return "gpt-enterprise"

      case "summarisation":

        return "lightweight-model"

      case "reasoning":

        return "advanced-reasoning-model"

      default:

        return "default-model"
    }
  }
}

module.exports =
new ModelRouter()