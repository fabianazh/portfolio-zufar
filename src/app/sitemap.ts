import { getAllProjects } from "@/utils/getAllProjects"

export default async function sitemap() {
    const baseUrl = "https://zufarms.vercel.app"

    const projects = getAllProjects().map((project: Project) => {
        return {
            url: `${baseUrl}/projects/${project.id}`,
            lastModified: project.created_at,
        }
    })

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
        },
        ...projects,
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
        },
    ]
}
