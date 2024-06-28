import { projects } from "@/data/projects"

export function getAllProjects() {
    return projects
}

export function getHighlightedProjects(): Project[] | undefined {
    return projects.filter((projects) => projects.isHighlighted)
}

export function getProjectById(id: string): Project | undefined {
    return projects.find((project) => project.id === id)
}
