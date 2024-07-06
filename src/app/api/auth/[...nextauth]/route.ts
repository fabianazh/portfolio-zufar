import { signIn } from '@/libs/firebase/service'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth/next'
import { AuthOptions } from 'next-auth'
import { authOptions } from '@/libs/utils/authOptions'

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
