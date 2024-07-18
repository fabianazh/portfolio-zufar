import TotalData from '@/components/Section/Dashboard/TotalData'
import UnreadMails from '@/components/Section/Dashboard/UnreadMails'
import { authOptions } from '@/libs/utils/authOptions'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export function generateMetadata() {
    return {
        title: 'Dashboard',
    }
}

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    return (
        <>
            <section className="w-full flex flex-col gap-1 mb-4 lg:mb-6">
                <h1 className="text-3xl lg:text-4xl font-semibold lg:font-bold">
                    Selamat datang, {session?.user?.name}!
                </h1>
                <span className="text-base font-medium">
                    Anda dapat mengelola, memperbarui, dan menambahkan konten
                    baru yang akan ditampilkan kepada pengguna. Pastikan semua
                    informasi yang Anda masukkan akurat dan terkini.
                </span>
            </section>
            <TotalData />
            <UnreadMails />
        </>
    )
}
