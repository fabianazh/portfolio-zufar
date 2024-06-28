"use client"

import { useEffect, useState } from "react"
import ProjectsGridSkeleton from "@/components/Skeleton/ProjectsGridSkeleton"
import { getHighlightedProjects } from "@/utils/getProjectData"
import Link from "next/link"
import ProjectsGrid from "@/components/Other/ProjectsGrid"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"

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
                <div className="w-full flex justify-between items-start">
                    <div className="flex w-fit flex-col">
                        <h1 className="text-2xl font-semibold">
                            Projek Unggulan
                        </h1>
                        <span className="font-medium">
                            Jelajahi projek unggulan di bawah ini untuk melihat
                            karya-karya terbaik saya.
                        </span>
                    </div>{" "}
                    <Link
                        href={"/projects"}
                        className="hover:underline inline-block w-fit"
                    >
                        <span className="font-medium inline-block">
                            Lihat Lainnya
                        </span>
                        <BiChevronRight className="inline-block" />
                    </Link>
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
