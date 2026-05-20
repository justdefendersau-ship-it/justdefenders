const { PrismaClient } =
require("@prisma/client")

const prisma =
new PrismaClient()

async function seed(){

  const analyst =
  await prisma.socAnalyst.create({

    data:{

      analystId:"SOC-001",

      displayName:"Tier1 Analyst",

      role:"SOC_ANALYST"
    }
  })

  const caseItem =
  await prisma.socCase.create({

    data:{

      caseId:"CASE-1001",

      title:"Suspicious PowerShell Activity",

      severity:"HIGH",

      status:"OPEN",

      assignedTo:
      analyst.displayName,

      slaMinutes:60
    }
  })

  await prisma.caseNote.create({

    data:{

      caseId:
      caseItem.id,

      analyst:
      analyst.displayName,

      note:
      "Initial triage completed."
    }
  })

  await prisma.caseEvidence.create({

    data:{

      caseId:
      caseItem.id,

      evidenceType:
      "PROCESS",

      content:
      "powershell.exe execution observed"
    }
  })

  await prisma.caseAudit.create({

    data:{

      caseId:
      caseItem.id,

      analyst:
      analyst.displayName,

      action:
      "CASE_CREATED"
    }
  })

  console.log("")
  console.log("====================================")
  console.log("CASE MANAGEMENT SEEDED")
  console.log("====================================")
  console.log("")
}

seed()