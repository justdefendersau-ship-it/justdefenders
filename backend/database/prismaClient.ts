export const prisma = {

  user: {

    findUnique: async (args?: any) => null,

    create: async (args?: any) => ({

      id: 1,

      username: "demo",

      password: "demo"
    })
  },

  tenant: {

    create: async (args?: any) => ({

      id: 1,

      name: "JustDefenders"
    })
  },

  securityCase: {

    findMany: async (args?: any) => ([]),

    create: async (args?: any) => ({

      id: 1,

      status: "OPEN"
    })
  },

  huntSession: {

    create: async (args?: any) => ({

      id: 1,

      status: "ACTIVE"
    }),

    findMany: async (args?: any) => ([])
  },

  incidentNote: {

    create: async (args?: any) => ({

      id: 1,

      created: true
    }),

    findMany: async (args?: any) => ([])
  },

  sOARPlaybook: {

    findMany: async (args?: any) => ([]),

    create: async (args?: any) => ({

      id: 1,

      name: "Default Playbook"
    })
  },

  responseAction: {

    create: async (args?: any) => ({

      id: 1,

      status: "EXECUTED"
    }),

    findMany: async (args?: any) => ([])
  }
}