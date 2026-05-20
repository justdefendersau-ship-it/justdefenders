/* =====================================================
   JustDefenders ©
   NextAuth Runtime
===================================================== */

import NextAuth
from "next-auth"

import CredentialsProvider
from "next-auth/providers/credentials"

const handler =
NextAuth({

  providers:[

    CredentialsProvider({

      name:"credentials",

      credentials:{

        email:{},

        password:{}
      },

      async authorize(credentials){

        if(

          credentials?.email ===
          "admin@justdefenders.local"

          &&

          credentials?.password ===
          "Password123!"
        ){

          return {

            id:"1",

            name:"Administrator",

            email:
            "admin@justdefenders.local"
          }
        }

        return null
      }
    })
  ],

  secret:
  process.env.NEXTAUTH_SECRET
})

export {

  handler as GET,
  handler as POST
}
