import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)
    // if (!session) {
    //     redirect('/')
    // }

    return <section>ini halaman dashboard {session?.user?.email}</section>
}
