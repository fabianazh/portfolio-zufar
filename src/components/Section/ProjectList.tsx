'use client'

import { useEffect, useState } from 'react'
import ProjectsGridSkeleton from '@/components/Skeleton/ProjectsGridSkeleton'
import ProjectsGrid from '@/components/Other/ProjectsGrid'
import { getData } from '@/libs/firebase/service'

export default function ProjectList() {
    const [projects, setProjects] = useState<Project[] | undefined>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchProjects() {
            try {
                const projectsData = await getData<Project>('projects')
                console.log(projectsData)
                setProjects(projectsData)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchProjects()
    }, [])

    if (loading) {
        return <ProjectsGridSkeleton />
    }

    if (error || !projects) {
        return <div>Projek tidak tersedia.</div>
    }

    return (
        <section className="w-full min-h-screen flex flex-col">
            <ProjectsGrid projects={projects}></ProjectsGrid>
        </section>
    )
}
