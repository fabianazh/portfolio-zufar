import PhotoGrid from "../../components/Other/PhotoGrid"

const projects = [
    {
        id: 400,
        thumbnail: "https://via.placeholder.com/300x400",
        year: "2024",
        name: "RS. Hermina",
    },
    {
        id: 500,
        thumbnail: "https://via.placeholder.com/300x500",
        year: "2024",
        name: "RS. Hermina",
    },
    {
        id: 600,
        thumbnail: "https://via.placeholder.com/300x600",
        year: "2024",
        name: "RS. Hermina",
    },
    {
        id: 300,
        thumbnail: "https://via.placeholder.com/400x300",
        year: "2024",
        name: "RS. Hermina",
    },
    {
        id: 300,
        thumbnail: "https://via.placeholder.com/500x300",
        year: "2024",
        name: "RS. Hermina",
    },
    {
        id: 300,
        thumbnail: "https://via.placeholder.com/600x300",
        year: "2024",
        name: "RS. Hermina",
    },
]

export default function ProjectsPage() {
    return (
        <>
            <section className="w-full flex flex-col gap-16 min-h-screen pb-20">
                <PhotoGrid projects={projects}></PhotoGrid>
            </section>
        </>
    )
}
