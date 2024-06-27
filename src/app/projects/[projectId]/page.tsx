import ProjectDetail from "@/components/Section/ProjectDetail"
import { getProjectById } from "@/utils/getProjectData"
import Link from "next/link"
import { BiArrowFromRight } from "react-icons/bi"

export async function generateMetadata({
    params,
}: {
    params: {
        projectId: string
    }
}) {
    try {
        const project = await getProjectById(params.projectId)

        if (project === undefined) {
            return {
                title: "Projek tidak ditemukan",
                description: "Sepertinya projek yang kamu cari tidak ada.",
                project: null,
            }
        }
        return {
            title: `Projek ${project.name}`,
            description: project.desc,
            images: [project.photos],
            project: project,
        }
    } catch (error) {
        console.log(error)
        return {
            title: "Projek tidak ditemukan",
            description: "Sepertinya projek yang kamu cari tidak ada.",
            project: null,
        }
    }
}

export default function HomePage({
    params,
}: {
    params: {
        projectId: string
    }
}) {
    return (
        <>
            <section className="w-full h-fit mb-6 flex items-start">
                <Link
                    href={"/projects"}
                    className="flex w-fit h-fit gap-2 items-center text-lg"
                >
                    <BiArrowFromRight></BiArrowFromRight>
                    <span>Kembali</span>
                </Link>
            </section>
            <ProjectDetail projectId={params.projectId} />
        </>
    )
}
