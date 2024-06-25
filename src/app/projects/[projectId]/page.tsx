"use client"

import { useParams } from "next/navigation"

export default function HomePage() {
    const { projectId } = useParams()
    console.log(projectId)
    return (
        <>
            <section className="w-full flex flex-col gap-16 min-h-screen">
                <div className="w-full h-fit flex">
                    <span className="block text-3xl font-semibold">
                        Hai 👋, <span className="inline-">{projectId}</span>
                    </span>
                </div>
            </section>
        </>
    )
}
