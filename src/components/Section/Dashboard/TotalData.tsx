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
                const profileCount = await getCollectionCount('profiles')
                const toolCount = await getCollectionCount('tools')
                const projectCount = await getCollectionCount('projects')
                const mailsCount = await getCollectionCount('mails')
                setCounts({ projectCount, profileCount, toolCount, mailsCount })
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
                        <section className="grid w-full h-auto grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-6">
                            <TotalDataCard
                                href={`/dashboard`}
                                title="Total Profil"
                                totalData={counts.projectCount}
                            />
                            <TotalDataCard
                                href={`/dashboard/tools`}
                                title="Total Perangkat"
                                totalData={counts.toolCount}
                            />
                            <TotalDataCard
                                href={`/dashboard/projects`}
                                title="Total Projek"
                                totalData={counts.projectCount}
                            />
                            <TotalDataCard
                                href={`/dashboard/mails`}
                                title="Total Pesan"
                                totalData={counts.mailsCount}
                            />
                        </section>
                    )}
                </>
            )}
        </>
    )
}
