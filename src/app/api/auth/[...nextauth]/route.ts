import { signIn } from '@/libs/firebase/service'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth/next'

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'text',
                },
                password: {
                    label: 'password',
                    type: 'password',
                },
            },
            async authorize(credentials: any) {
                const { email, password } = credentials as {
                    email: string
                    password: string
                }

                const user: any = await signIn(email)

                if (user) {
                    const passwordConfirm = await bcrypt.compare(
                        password,
                        user.password
                    )
                    if (passwordConfirm) {
                        return user
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, profile, account, user }: any) {
            if (account?.provider === 'credentials') {
                token.user = user
                token.email = user.email
                token.phone = user.phone
                token.fullname = user.fullname
                token.username = user.username
            }
            return token
        },
        async session({ session, token }: any) {
            if ('email' in token) {
                session.user.email = token.email
            }
            if ('phone' in token) {
                session.user.phone = token.phone
            }
            if ('fullname' in token) {
                session.user.fullname = token.fullname
            }
            if ('username' in token) {
                session.user.username = token.username
            }

            return session
        },
    },
    pages: {
        signIn: '/auth/sambalado',
    },
}

const handler = NextAuth(authOptions)
export { authOptions, handler as GET, handler as POST }
