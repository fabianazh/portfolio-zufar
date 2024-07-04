import { authOptions } from '@/libs/utils/auth-options'
import { getServerSession } from 'next-auth'

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    return <section>ini halaman dashboard {session?.user?.email}</section>
}
