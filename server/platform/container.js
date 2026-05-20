/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\platform\container.js
===================================================== */

class ServiceContainer {

  constructor(){

    this.services =
    new Map()
  }

  register(
    name,
    instance
  ){

    this.services.set(
      name,
      instance
    )
  }

  resolve(name){

    return this.services.get(name)
  }

  has(name){

    return this.services.has(name)
  }
}

module.exports =
new ServiceContainer()