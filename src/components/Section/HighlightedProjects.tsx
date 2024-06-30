'use client'

import { useEffect, useState } from 'react'
import ProjectsGridSkeleton from '@/components/Skeleton/ProjectsGridSkeleton'
import { getHighlightedProjects } from '@/libs/utils/getProjectData'
import Link from 'next/link'
import ProjectsGrid from '@/components/Other/ProjectsGrid'
import { RxArrowUp } from 'react-icons/rx'

export default function HighlightedProjects() {
    const [projects, setProjects] = useState<Project[] | undefined>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchProjects() {
            try {
                const projectsData = await getHighlightedProjects()
                setProjects(projectsData)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchProjects()
    }, [])

    if (error || !projects) {
        return <div>Projek unggulan tidak tersedia.</div>
    }

    return (
        <>
            <section className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-col">
                    <div className="flex w-full justify-between items-center">
                        <h1 className="text-2xl font-semibold">
                            Projek Unggulan
                        </h1>

                        <Link
                            href={'/projects'}
                            className="hover:underline inline-block w-fit"
                        >
                            <span className="font-medium inline-block">
                                Lihat Lainnya{' '}
                            </span>
                            <RxArrowUp className="inline-block rotate-45" />
                        </Link>
                    </div>
                    <span className="font-medium">
                        Jelajahi projek unggulan di bawah ini untuk melihat
                        karya-karya terbaik saya.
                    </span>
                </div>
                {loading ? (
                    <ProjectsGridSkeleton />
                ) : (
                    <ProjectsGrid projects={projects} />
                )}
            </section>
        </>
    )
}
