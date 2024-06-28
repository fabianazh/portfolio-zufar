import ProjectsGrid from "@/components/Section/ProjectsGrid"
import { getAllProjects } from "@/utils/getProjectData"

export default function ProjectPage() {
    const projects = getAllProjects()

    return (
        <>
            <section className="w-full flex min-h-screen">
                <ProjectsGrid projects={projects} />
            </section>
        </>
    )
}
