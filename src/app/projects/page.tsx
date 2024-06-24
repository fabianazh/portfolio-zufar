import Image from "next/image"

const photos = [
    {
        src: "https://via.placeholder.com/300x400",
        alt: "Photo 1",
        width: 300,
        height: 400,
    },
    {
        src: "https://via.placeholder.com/300x500",
        alt: "Photo 2",
        width: 300,
        height: 500,
    },
    {
        src: "https://via.placeholder.com/300x600",
        alt: "Photo 3",
        width: 300,
        height: 600,
    },
    {
        src: "https://via.placeholder.com/400x300",
        alt: "Photo 4",
        width: 400,
        height: 300,
    },
    {
        src: "https://via.placeholder.com/500x300",
        alt: "Photo 5",
        width: 500,
        height: 300,
    },
    {
        src: "https://via.placeholder.com/600x300",
        alt: "Photo 6",
        width: 600,
        height: 300,
    },
]

function PhotoGrid() {
    return (
        <div className="container mx-auto px-4">
            <div className="columns-3 gap-4">
                {photos.map((photo, index) => (
                    <div key={index} className="w-full mb-4">
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            width={300}
                            height={400}
                            layout="responsive"
                            objectFit="contain"
                            className="w-full h-auto"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function ProjectsPage() {
    return (
        <>
            <section className="w-full flex flex-col gap-16 min-h-screen">
                <PhotoGrid></PhotoGrid>
            </section>
        </>
    )
}
