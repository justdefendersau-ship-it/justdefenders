export class IdentityFederationRuntime {

  async verifyIdentity(identity?: any) {

    return {

      verified: true,

      identity
    }
  }
}
