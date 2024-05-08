import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { Adapter } from "next-auth/adapters";
import db from "./db";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
} satisfies NextAuthOptions;
