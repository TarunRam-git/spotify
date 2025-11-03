import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  
  callbacks: {
    async signIn({ user }) {
      const client = await clientPromise;
      const users = client.db().collection("users");
      const existing = await users.findOne({ email: user.email });
      if (!existing) {
        await users.insertOne({
          name: user.name,
          email: user.email,
          image: user.image,
          createdAt: new Date(),
        });
      }
      return true;
    },
    async session({ session }) {
      const client = await clientPromise;
      const users = client.db().collection("users");
      const dbUser = await users.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.id = dbUser._id.toString();
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
