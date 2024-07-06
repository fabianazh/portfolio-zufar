import { authOptions } from '@/libs/utils/auth-options'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    return (
        <section className="w-full flex flex-col gap-6 min-h-screen">
            <div className="w-full flex flex-col gap-1">
                <h1 className="text-3xl font-semibold">
                    Selamat datang, {session?.user?.name}!
                </h1>
                <span className="text-base font-medium">
                    Anda dapat mengelola, memperbarui, dan menambahkan konten
                    baru yang akan ditampilkan kepada pengguna. Pastikan semua
                    informasi yang Anda masukkan akurat dan terkini.
                </span>
            </div>
            <div className="grid w-full h-auto grid-cols-4 gap-6">
                <Link
                    href={`/dashboard/projects`}
                    className="w-full h-auto border bg-white p-5 rounded-md flex flex-col gap-1"
                >
                    <span className="font-medium">Total Projek</span>
                    <div className="w-full flex">
                        <span className="font-bold text-3xl block">1000</span>
                    </div>
                </Link>
                <Link
                    href={`/dashboard/`}
                    className="w-full h-auto border bg-white p-5 rounded-md flex flex-col gap-1"
                >
                    <span className="font-medium">Total Kategori Projek</span>
                    <div className="w-full flex">
                        <span className="font-bold text-3xl block">1000</span>
                    </div>
                </Link>
                <Link
                    href={`/dashboard/`}
                    className="w-full h-auto border bg-white p-5 rounded-md flex flex-col gap-1"
                >
                    <span className="font-medium">Total Tools</span>
                    <div className="w-full flex">
                        <span className="font-bold text-3xl block">1000</span>
                    </div>
                </Link>
                <Link
                    href={`/dashboard/`}
                    className="w-full h-auto border bg-white p-5 rounded-md flex flex-col gap-1"
                >
                    <span className="font-medium">Total Pesan</span>
                    <div className="w-full flex">
                        <span className="font-bold text-3xl block">1000</span>
                    </div>
                </Link>
            </div>
        </section>
    )
}
