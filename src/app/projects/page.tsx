import PhotoGrid from "@/components/Other/PhotoGrid"
import { getAllProjects } from "@/utils/getProjectData"

export default function ProjectPage() {
    const projects = getAllProjects()

    return (
        <>
            <section className="w-full flex min-h-screen">
                <PhotoGrid projects={projects} />
            </section>
        </>
    )
}
