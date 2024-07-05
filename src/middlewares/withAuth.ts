import { getToken } from 'next-auth/jwt'
import {
    NextFetchEvent,
    NextMiddleware,
    NextRequest,
    NextResponse,
} from 'next/server'

const authPage = ['auth']

export default function WithAuth(
    middleware: NextMiddleware,
    requireAuth: string[] = []
) {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname.split('/')[1]
        if (requireAuth.includes(pathname)) {
            const token = await getToken({
                req,
                secret: process.env.NEXTAUTH_SECRET,
            })
            if (!token && !authPage.includes(pathname)) {
                const url = new URL('/', req.url)
                return NextResponse.redirect(url)
            }
            if (token) {
                if (authPage.includes(pathname)) {
                    return NextResponse.redirect(new URL('/dashboard', req.url))
                }
            }
        }
        return middleware(req, next)
    }
}
