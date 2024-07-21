'use client'

import { useEffect, useState } from 'react'
import GridLayout from '@/components/Layout/GridLayout'
import projectServices from '@/services/projects'
import ProjectsCardSkeleton from '@/components/Skeleton/ProjectsCardSkeleton'
import ProjectCard from '@/components/Card/ProjectCard'

export default function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchProjects() {
            try {
                const { data } = await projectServices.getAllProjects()
                setProjects(data.data)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchProjects()
    }, [])

    if (error) {
        return <></>
    }

    return (
        <GridLayout>
            <GridLayout.Items
                isLoading={loading}
                isEmpty={projects.length < 1}
                emptyMessage="Belum ada projek,"
                loadingSkeleton={<ProjectsCardSkeleton />}
            >
                {projects.map((project) => (
                    <ProjectCard
                        href={`/projects/${project.id}`}
                        project={project}
                        key={project.id}
                    />
                ))}
            </GridLayout.Items>
        </GridLayout>
    )
}
