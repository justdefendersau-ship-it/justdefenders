const bcrypt =
require("bcryptjs")

const { PrismaClient } =
require("@prisma/client")

const prisma =
new PrismaClient()

async function main(){

  const existing =
  await prisma.user.findUnique({

    where: {

      username:"admin"
    }
  })

  if(existing){

    console.log(
      "Admin already exists"
    )

    return
  }

  const hash =
  await bcrypt.hash(

    "JustDefenders123!",

    10
  )

  await prisma.user.create({

    data: {

      username:"admin",

      passwordHash:hash,

      role:"ADMIN"
    }
  })

  console.log(
    "Default admin created"
  )
}

main()
