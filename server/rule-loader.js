const fs =
require("fs")

const path =
require("path")

const yaml =
require("js-yaml")

const { PrismaClient } =
require("@prisma/client")

const prisma =
new PrismaClient()

async function loadRules(){

  const directory =
  path.join(
    process.cwd(),
    "detection-rules"
  )

  const files =
  fs.readdirSync(directory)

  for(const file of files){

    if(file.endsWith(".yml")){

      const full =
      path.join(
        directory,
        file
      )

      const content =
      fs.readFileSync(
        full,
        "utf8"
      )

      const rule =
      yaml.load(content)

      const existing =
      await prisma.detectionRule.findFirst({

        where:{

          ruleId:
          rule.id
        }
      })

      if(!existing){

        await prisma.detectionRule.create({

          data:{

            ruleId:
            rule.id,

            title:
            rule.title,

            version:String(
            rule.version),

            severity:
            rule.severity,

            status:
            rule.status,

            tactic:
            rule.mitre.tactic,

            technique:
            rule.mitre.technique,

            description:
            rule.description,

            source:
            rule.logic.source,

            threshold:
            rule.logic.threshold
          }
        })

        console.log(
          "Loaded rule:",
          rule.title
        )
      }
    }
  }

  console.log("")
  console.log("====================================")
  console.log("DETECTION RULE LOADER COMPLETE")
  console.log("====================================")
  console.log("")
}

loadRules()

