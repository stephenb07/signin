import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '@/lib/mongodb';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const client = await clientPromise;
        const users = client.db('auth').collection('users');
        
        const user = await users.findOne({
          email: credentials.email,
          password: credentials.password // In production, use hashed passwords!
        });
        
        if (user) {
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/',
    error: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };

