export class PolicyEngineRuntime {

  async evaluatePolicy(

    policy?: any,

    context?: any
  ) {

    return {

      decision: "ALLOW",

      policy,

      context
    }
  }
}
