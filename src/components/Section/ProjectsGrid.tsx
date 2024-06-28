"use client"

import { getAllProjects } from "@/utils/getProjectData"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import ProjectsGridSkeleton from "@/components/Skeleton/ProjectsGridSkeleton"

export default function ProjectsGrid() {
    const [projects, setProjects] = useState<Project[] | undefined>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchProjects() {
            try {
                const projectsData = await getAllProjects()
                setProjects(projectsData)
            } catch (e) {
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
        return <div>Projek tidak ditemukan.</div>
    }

    return (
        <div className={`w-full h-full columns-1 lg:columns-3 gap-x-8`}>
            {projects.map((project, index) => (
                <Link
                    href={`/projects/${project.id}`}
                    key={index}
                    className="w-full relative h-fit flex-col flex gap-3 pb-8 mb-8 lg:mb-6 group"
                >
                    <div className="w-full flex h-fit overflow-hidden scale-100">
                        <Image
                            src={`/img/projects/${project.thumbnail}`}
                            alt={`Projek ${project.name}`}
                            width={300}
                            height={400}
                            layout="responsive"
                            objectFit="contain"
                            className={`w-full h-auto scale-100 duration-500 group-hover:scale-125 transition-all`}
                        />
                    </div>
                    <div className="flex w-full text-sm gap-2 text-black font-medium absolute bottom-0 left-0">
                        <div className="w-fit whitespace-nowrap">
                            <span>{project.month} </span>
                            <span>{project.year}</span>
                        </div>
                        <span>/</span>
                        <span className="truncate">{project.name}</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}
