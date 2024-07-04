import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    return <section>ini halaman dashboard {session?.user?.email}</section>
}
