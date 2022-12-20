import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@core/lib/mongodb";
import bcrypt from "bcryptjs";

const useSecureCookies = !!process.env.VERCEL_URL;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const client = await clientPromise;
          const db = client.db();
          const collection = db.collection("auth");
          const user = await collection.findOne({
            username: credentials.username,
          });

          if (!user) {
            throw new Error("No user found");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return user;
        } catch (error) {}
      },
    }),
  ],
  callbacks: {
    async jwt({ account, token }) {
      if (account) {
        token = account;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    }
    
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  secret: process.env.SECRET,
  cookies: {
    sessionToken: {
      name: `${useSecureCookies ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: process.env.VERCEL_URL || "localhost",
        secure: useSecureCookies,
      },
    },
  },
  adapter: MongoDBAdapter(clientPromise),
});
