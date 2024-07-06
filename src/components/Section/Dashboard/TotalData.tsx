'use client'

import TotalDataCard from '@/components/Card/TotalDataCard'
import { getCollectionCount } from '@/libs/firebase/service'
import { useEffect, useState } from 'react'

export default function TotalData() {
    const [counts, setCounts] = useState<any>({})

    useEffect(() => {
        async function getAllCounts() {
            const projectCount = await getCollectionCount('projects')
            const userCount = await getCollectionCount('users')
            const contactCount = await getCollectionCount('contacts')
            setCounts({ projectCount, userCount, contactCount })
        }

        getAllCounts()
    }, [])

    return (
        <>
            <section className="grid w-full h-auto grid-cols-4 gap-6">
                <TotalDataCard
                    href={`/dashboard/projects`}
                    title="Total Projek"
                    totalData={counts.projectCount}
                />
                <TotalDataCard
                    href={`/dashboard/`}
                    title="Total Kategori Projek"
                    totalData={counts.userCount}
                />
                <TotalDataCard
                    href={`/dashboard/`}
                    title="Total Tools"
                    totalData={1000}
                />
                <TotalDataCard
                    href={`/dashboard/`}
                    title="Total Pesan"
                    totalData={counts.contactCount}
                />
            </section>
        </>
    )
}
