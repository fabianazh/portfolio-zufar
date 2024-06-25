import Image from "next/image"
import Link from "next/link"

export default function PhotoGrid({
    projects,
    className,
    imgClassName,
}: {
    projects: {
        id: number
        thumbnail: string
        year: string
        name: string
    }[]
    className?: string
    imgClassName?: string
}) {
    return (
        <div
            className={`w-full h-full columns-1 lg:columns-3 gap-x-8 ${className}`}
        >
            {projects.map((photo, index) => (
                <Link
                    href={`/projects/${photo.id}`}
                    key={index}
                    className="w-full relative h-fit flex-col flex gap-3 pb-8 mb-8 lg:mb-6"
                >
                    <Image
                        src={photo.thumbnail}
                        alt={`Projek ${photo.name}`}
                        width={300}
                        height={400}
                        layout="responsive"
                        objectFit="contain"
                        className={`w-full h-auto ${imgClassName}`}
                    />
                    <div className="flex w-full gap-4 font-medium absolute bottom-0 left-0">
                        <span>{photo.year}</span>
                        <span>/</span>
                        <span>{photo.name}</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}
