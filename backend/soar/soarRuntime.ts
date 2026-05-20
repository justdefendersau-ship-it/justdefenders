export class SoarRuntime {

  async executeAutomation(

    playbook?: any,

    incident?: any
  ) {

    return {

      soar: "EXECUTED",

      playbook,

      incident
    }
  }
}