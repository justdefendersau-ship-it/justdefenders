export class ZeroTrustRuntime {

  async validateAccess(

    identity?: any,

    resource?: any
  ) {

    return {

      access: "GRANTED",

      identity,

      resource
    }
  }
}
