import PhotoGrid from "@/components/Other/PhotoGrid"
import getAllProjects from "@/utils/getAllProjects"

export default function ProjectsPage() {
    const projects = getAllProjects()
    return (
        <>
            <section className="w-full flex flex-col gap-16 min-h-screen pb-20">
                <PhotoGrid projects={projects}></PhotoGrid>
            </section>
        </>
    )
}
