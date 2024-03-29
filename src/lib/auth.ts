import { db } from "@/db"
import { env } from "@/env.mjs"
import NextAuth, { DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"

import { PlanetScaleAdapter } from "./PlanetScaleAdapter"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PlanetScaleAdapter(db),
  providers: [Google],
  trustHost: true,
  session: {
    strategy: "database",
  },
  callbacks: {
    // @ts-ignore
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id
        session.user.name = user.name
        session.user.email = user.email
        session.user.image = user.image
      }

      return session
    },
  },
  secret: env.AUTH_SECRET,
})
