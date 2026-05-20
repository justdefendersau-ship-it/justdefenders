const { PrismaClient } =
require("@prisma/client")

const prisma =
new PrismaClient()

async function seed(){

  const feed =
  await prisma.threatFeed.create({

    data:{

      name:"JustDefenders Global Intelligence",

      provider:"JustDefenders",

      confidence:90
    }
  })

  await prisma.threatIOC.create({

    data:{

      feedId:
      feed.id,

      type:"IP",

      value:"185.220.101.1",

      severity:"HIGH",

      confidence:95,

      malwareFamily:"CobaltStrike",

      campaign:"APT-SIMULATION"
    }
  })

  await prisma.threatIOC.create({

    data:{

      feedId:
      feed.id,

      type:"DOMAIN",

      value:"malicious-control.net",

      severity:"CRITICAL",

      confidence:98,

      malwareFamily:"Emotet",

      campaign:"EMOTET-CAMPAIGN"
    }
  })

  console.log("")
  console.log("====================================")
  console.log("THREAT INTELLIGENCE SEEDED")
  console.log("====================================")
  console.log("")
}

seed()
