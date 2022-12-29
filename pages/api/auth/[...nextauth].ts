import NextAuth, { Awaitable } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@core/lib/mongodb";
import { compare } from "@core/lib/auth";
import { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";

const useSecureCookies = !!process.env.VERCEL_URL;

export default NextAuth({
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db();
        const user = await db
          .collection("auth")
          .findOne({ username: credentials.username });

        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        const cred = {
          name: user.username as string,
        } as Awaitable<typeof user>;

        return cred;
      },
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 7 * 24 * 60 * 60,
    async encode(params: {
      secret: string;
      token: JWT;
      maxAge: number;
    }): Promise<string> {
      return jwt.sign(params.token, params.secret);
    },
    async decode(params: { secret: string; token: string }): Promise<JWT> {
      return jwt.verify(params.token, params.secret) as JWT;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      return session;
    },
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
        domain: process.env.VERCEL_URL || "admin.localhost",
        secure: useSecureCookies,
      },
    },
  },
  adapter: MongoDBAdapter(clientPromise),
});
