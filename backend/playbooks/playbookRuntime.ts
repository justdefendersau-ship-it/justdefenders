export class PlaybookRuntime {

  async executePlaybook(

    playbook?: any,

    incident?: any
  ) {

    return {

      playbook: "EXECUTED",

      requestedPlaybook: playbook,

      incident
    }
  }
}