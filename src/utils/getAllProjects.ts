const projects: Project[] = [
    {
        id: "1",
        thumbnail: "https://via.placeholder.com/300x400",
        month: "2024",
        year: "2024",
        name: "RS. Hermina",
        desc: "ppp",
        photos: [
            {
                photo: "",
                alt: "",
            },
            {
                photo: "",
                alt: "",
            },
        ],
        created_at: "2024-06-27T07:28:26.026Z",
    },
]

export function getAllProjects() {
    return projects
}

export function getProjectById(id: string): Project | undefined {
    return projects.find((project) => project.id === id)
}
