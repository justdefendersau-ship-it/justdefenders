/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\observability\metrics-registry.js
===================================================== */

class MetricsRegistry {

  constructor(){

    this.metrics = {}
  }

  increment(name){

    if(!this.metrics[name]){

      this.metrics[name] = 0
    }

    this.metrics[name]++
  }

  set(name,value){

    this.metrics[name] =
    value
  }

  getAll(){

    return this.metrics
  }
}

module.exports =
new MetricsRegistry()