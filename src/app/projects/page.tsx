import PhotoGrid from "@/components/Other/PhotoGrid"
import { projects } from "@/data/projects"

export default function ProjectsPage() {
    return (
        <>
            <section className="w-full flex flex-col gap-16 min-h-screen pb-20">
                <PhotoGrid projects={projects}></PhotoGrid>
            </section>
        </>
    )
}
