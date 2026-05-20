/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\ai\memory\vector-memory.js
===================================================== */

class VectorMemory {

  constructor(){

    this.memory = []
  }

  add(item){

    this.memory.push({

      id:
      Date.now(),

      embedding:
      item.embedding,

      content:
      item.content
    })
  }

  search(query){

    return this.memory.slice(0,5)
  }
}

module.exports =
new VectorMemory()