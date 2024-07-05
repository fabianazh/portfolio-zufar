import { authOptions } from '@/libs/utils/auth-options'
import { getServerSession } from 'next-auth'

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    return (
        <section className="w-full flex flex-col gap-6 min-h-screen">
            <div className="w-full flex flex-col">
                <h1 className="text-3xl font-semibold">
                    Selamat datang, {session?.user?.name}!
                </h1>
                <span className="text-base font-medium">
                    Anda dapat mengelola, memperbarui, dan menambahkan konten
                    baru yang akan ditampilkan kepada pengguna. Pastikan semua
                    informasi yang Anda masukkan akurat dan terkini.
                </span>
            </div>
        </section>
    )
}
