'use client'

import pageServices from '@/services/pages'
import { useEffect, useState } from 'react'
import GridLayout from '@/components/Layout/GridLayout'
import PageCard from '@/components/Card/PageCard'
import PagesCardSkeleton from '@/components/Skeleton/PagesCardSkeleton'

export default function PageList() {
    const [pages, setPages] = useState<Page[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchPages() {
            try {
                const { data } = await pageServices.getAllPages()
                setPages(data.data)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchPages()
    }, [])

    if (error) {
        return <></>
    }

    return (
        <>
            <GridLayout>
                <GridLayout.Header
                    title="List Halaman"
                    desc="Anda dapat melihat dan mengubah
                         halaman yang akan ditampilkan kepada pengguna."
                />
                <GridLayout.Items
                    isLoading={loading}
                    loadingSkeleton={<PagesCardSkeleton />}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-4 lg:gap-x-6 lg:gap-y-6"
                >
                    {pages.map((page) => (
                        <>
                            <PageCard key={page.id} page={page} />
                        </>
                    ))}
                </GridLayout.Items>
            </GridLayout>
        </>
    )
}
