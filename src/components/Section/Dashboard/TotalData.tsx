'use client'

import TotalDataCard from '@/components/Card/TotalDataCard'
import TotalDataSkeleton from '@/components/Skeleton/TotalDataSkeleton'
import { getCollectionCount } from '@/libs/firebase/service'
import { useEffect, useState } from 'react'

export default function TotalData() {
    const [counts, setCounts] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        async function getAllCounts() {
            try {
                const projectCount = await getCollectionCount('projects')
                const userCount = await getCollectionCount('users')
                const contactCount = await getCollectionCount('contacts')
                setCounts({ projectCount, userCount, contactCount })
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        getAllCounts()
    }, [])

    return (
        <>
            {error ? (
                <></>
            ) : (
                <>
                    {loading ? (
                        <TotalDataSkeleton />
                    ) : (
                        <section className="grid w-full h-auto grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
                    )}
                </>
            )}
        </>
    )
}
