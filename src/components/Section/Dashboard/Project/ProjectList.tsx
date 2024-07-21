'use client'

import GridLayout from '@/components/Layout/GridLayout'
import ProjectsCardSkeleton from '@/components/Skeleton/ProjectsCardSkeleton'
import projectServices from '@/services/projects'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BsPlus } from 'react-icons/bs'
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
        <>
            <GridLayout>
                <GridLayout.Header
                    title="List Projek"
                    desc="Anda dapat melihat, menambahkan, mengubah dan menghapus
                        informasi projek yang akan ditampilkan kepada pengguna."
                />
                <GridLayout.Items
                    isLoading={loading}
                    loadingSkeleton={<ProjectsCardSkeleton />}
                >
                    <Link
                        href={`/dashboard/projects/add`}
                        className="w-full relative aspect-video flex-col flex items-center justify-center hover:bg-stone-100 rounded overflow-hidden transition-all duration-300 bg-white border mb-8 lg:mb-4"
                    >
                        <BsPlus className="text-4xl font-medium" />
                        <span className="text-base lg:text-lg font-semibold">
                            Tambah Projek
                        </span>
                    </Link>

                    {projects.map((project) => (
                        <ProjectCard
                            href={`/dashboard/projects/${project.id}`}
                            project={project}
                            key={project.id}
                            withDropdown
                        />
                    ))}
                </GridLayout.Items>
            </GridLayout>
        </>
    )
}
