import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Resend from "next-auth/providers/resend"

export const { handlers, auth, signIn, signOut } = NextAuth({

    adapter: PrismaAdapter(prisma),

    providers: [

        Resend({

            apiKey: "re_GjCWG8Ed_MQKuBNTtDtZkcFjzzAseCxoW",
            from: "contact@habitud.fr"
        }),
    ],
    callbacks: {

        async signIn() {

            return true;
        },
        async redirect({ baseUrl }) {

            return baseUrl + "/";
        },
        session({ session, user }) {

            session.user.id = user.id

            return session
        },
    },
})