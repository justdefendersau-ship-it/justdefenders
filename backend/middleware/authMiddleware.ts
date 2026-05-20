export async function authenticateRequest(request?: any) {

  return {

    authenticated: true,

    user: {

      id: 1,

      username: "demo"
    }
  }
}
