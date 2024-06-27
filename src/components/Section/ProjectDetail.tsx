"use client"

import { getProjectById } from "@/utils/getProjectData"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function ProjectDetail({ projectId }: { projectId: string }) {
    const [project, setProject] = useState<Project | null | undefined>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchProject() {
            try {
                const projectData = await getProjectById(projectId)
                setProject(projectData)
            } catch (e) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchProject()
    }, [projectId])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error || !project) {
        return <div>Projek tidak ditemukan.</div>
    }

    return (
        <>
            <section className="w-full border flex flex-col gap-16 min-h-screen">
                <div className="w-full flex h-fit overflow-hidden scale-100">
                    <Image
                        src={`/img/projects/${project.thumbnail}`}
                        alt={`Projek ${project.name}`}
                        width={900}
                        height={700}
                        layout="responsive"
                        objectFit="contain"
                        className={`w-full h-auto scale-100 duration-300 group-hover:scale-125 transition-all`}
                    />
                </div>
                <div className="w-full h-fit flex">
                    <span className="block text-3xl font-semibold">
                        Hai 👋, <span className="inline-">{project.id}</span>
                    </span>
                </div>
            </section>
        </>
    )
}
