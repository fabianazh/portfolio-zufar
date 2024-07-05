import { authOptions } from '@/libs/utils/auth-options'
import { getServerSession } from 'next-auth'

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    return <section>Selamat datang, {session?.user?.name}!</section>
}
