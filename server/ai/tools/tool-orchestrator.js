/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\ai\tools\tool-orchestrator.js
===================================================== */

class ToolOrchestrator {

  constructor(){

    this.tools = []
  }

  register(tool){

    this.tools.push(tool)
  }

  execute(name,input){

    const tool =
    this.tools.find(
      t => t.name === name
    )

    if(!tool){

      return null
    }

    return tool.handler(input)
  }
}

module.exports =
new ToolOrchestrator()