'use client'

import { useEffect, useState } from 'react'
import ProjectsGridSkeleton from '@/components/Skeleton/ProjectsGridSkeleton'
import Image from 'next/image'
import Link from 'next/link'
import GridLayout from '@/components/Layout/GridLayout'
import projectServices from '@/services/projects'
import NotFound from '@/components/Other/NotFound'

export default function ProjectList() {
    const [projects, setProjects] = useState<Project[] | undefined>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchProjects() {
            try {
                const { data } = await projectServices.getAllProjects()
                console.log(data)
                setProjects(data.data)
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
        return <NotFound message="Projek tidak tersedia." />
    }

    return (
        <section className="w-full min-h-screen flex flex-col">
            <GridLayout>
                {projects.map((project) => (
                    <Link
                        href={`/projects/${project.id}`}
                        key={project.id}
                        className="w-full relative h-fit flex-col flex gap-3 pb-8 mb-8 lg:mb-4 group"
                    >
                        <div className="w-full flex h-fit overflow-hidden scale-100">
                            <Image
                                src={`/img/projects/${project.id}/${project.thumbnail.photo}`}
                                alt={`Projek ${project.name}`}
                                width={300}
                                height={400}
                                layout="responsive"
                                draggable={false}
                                className={`w-full h-full scale-100 duration-500 group-hover:scale-110 transition-all`}
                            />
                        </div>
                        <div className="flex w-full text-sm gap-2 text-black font-semibold absolute bottom-0 left-0">
                            <span>{project.year}</span>
                            <span>/</span>
                            <span className="truncate">{project.name}</span>
                        </div>
                    </Link>
                ))}
            </GridLayout>
        </section>
    )
}
