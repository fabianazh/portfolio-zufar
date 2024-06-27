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
            <section className="w-full flex flex-col gap-8">
                {/* Thumbnail  */}
                <div className="w-full h-fit flex flex-col gap-2">
                    <div className="w-full flex h-fit overflow-hidden scale-100 mb-2">
                        <Image
                            src={`/img/projects/${project.thumbnail}`}
                            alt={`Projek ${project.name}`}
                            width={900}
                            height={700}
                            layout="responsive"
                            objectFit="contain"
                            className={`w-full h-auto transition-all`}
                        />
                    </div>
                    <div className="w-full h-fit flex justify-between">
                        <div className="w-fit flex flex-col">
                            <span className="text-sm font-medium">
                                Nama Projek
                            </span>
                            <span className="text-lg font-semibold">
                                {project.name}
                            </span>
                        </div>

                        <div className="w-fit flex flex-col items-end">
                            <span className="text-sm font-medium">Tahun</span>
                            <span className="text-lg font-semibold">
                                {project.month} {project.year}
                            </span>
                        </div>
                    </div>
                    {/* Description */}
                    <div className="w-full h-fit flex flex-col">
                        <span className="font-medium">{project.desc}</span>
                    </div>
                    {/* End Description */}
                </div>
                {/* End Thumbnail  */}

                {/* Images */}
                <div className="w-full h-auto flex flex-col gap-2">
                    <span className="font-semibold text-base">
                        Gambar Lainnya
                    </span>
                    <div className="w-full grid grid-cols-2 gap-6 h-fit">
                        {project.photos.map((item, index) => (
                            <Image
                                key={index}
                                src={`/img/projects/${item.photo}`}
                                alt={`Projek ${item.alt}`}
                                width={900}
                                height={700}
                                layout="responsive"
                                objectFit="contain"
                                className={`w-full h-full transition-all`}
                            />
                        ))}
                    </div>
                </div>
                {/* End Images */}
            </section>
        </>
    )
}
