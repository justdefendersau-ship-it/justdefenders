export class ThreatHuntingRuntime {

  async executeHunt(query?: any) {

    return {

      hunting: "ACTIVE",

      query
    }
  }
}
