/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\reliability\circuit-breaker.js
===================================================== */

class CircuitBreaker {

  constructor(limit){

    this.failures = 0

    this.limit =
    limit || 5

    this.open = false
  }

  success(){

    this.failures = 0

    this.open = false
  }

  failure(){

    this.failures++

    if(this.failures >= this.limit){

      this.open = true
    }
  }

  canExecute(){

    return !this.open
  }
}

module.exports =
CircuitBreaker