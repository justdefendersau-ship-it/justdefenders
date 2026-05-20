export class UbaRuntime {

  async analyseBehaviour(

    username?: any,

    activity?: any
  ) {

    return {

      uba: "ANALYSED",

      username,

      activity
    }
  }
}