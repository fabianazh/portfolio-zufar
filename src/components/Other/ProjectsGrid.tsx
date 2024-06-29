import Image from "next/image"
import Link from "next/link"

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
    return (
        <div className={`w-full h-full columns-1 lg:columns-3 gap-x-5`}>
            {projects.map((project) => (
                <Link
                    href={`/projects/${project.id}`}
                    key={project.id}
                    className="w-full relative h-fit flex-col flex gap-3 pb-8 mb-8 lg:mb-4 group"
                >
                    <div className="w-full flex h-fit overflow-hidden scale-100">
                        <Image
                            src={`/img/projects/${project.thumbnail.photo}`}
                            alt={`Projek ${project.thumbnail.alt}`}
                            width={300}
                            height={400}
                            layout="responsive"
                            objectFit="contain"
                            draggable={false}
                            className={`w-full h-auto scale-100 duration-500 group-hover:scale-110 transition-all`}
                        />
                    </div>
                    <div className="flex w-full text-sm gap-2 text-black font-medium absolute bottom-0 left-0">
                        <div className="w-fit whitespace-nowrap">
                            <span>{project.month} </span>
                            <span>{project.year}</span>
                        </div>
                        <span>/</span>
                        <span className="truncate">{project.name}</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}