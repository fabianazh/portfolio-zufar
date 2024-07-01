'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function DashboardPage() {
    const { data } = useSession()
    console.log(data)
    if (!data) {
        redirect('/')
    }
    return (
        <>
            <section>ini halaman dashboard {data?.user?.email}</section>
        </>
    )
}
