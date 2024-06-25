import PhotoGrid from "@/components/Other/PhotoGrid"

const projects = [
    {
        id: "rs-hermina",
        thumbnail: "/nama-projek/nama-gambar",
        month: "Jan",
        year: "2024",
        name: "RS. Hermina",
        desc: "deskripsi disini",
        photos: [
            "/nama-projek/nama-gambar",
            "/nama-projek/nama-gambar",
            "/nama-projek/nama-gambar",
        ],
    },
    {
        id: "rs-hermina",
        thumbnail: "/nama-projek/nama-gambar",
        month: "Jan",
        year: "2024",
        name: "RS. Hermina",
        desc: "deskripsi disini",
        photos: [
            "/nama-projek/nama-gambar",
            "/nama-projek/nama-gambar",
            "/nama-projek/nama-gambar",
        ],
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
