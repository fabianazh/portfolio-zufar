'use client'

import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Welcome() {
    const [session, setSession] = useState(null)

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession()
            setSession(sessionData)
        }
        fetchSession()
    }, [])

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
        </>
    )
}
