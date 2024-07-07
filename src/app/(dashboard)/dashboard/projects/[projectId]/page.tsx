import ProjectDetail from '@/components/Section/Landing/ProjectDetail'
import projectServices from '@/services/projects'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'

export async function generateMetadata({
    params,
}: {
    params: {
        projectId: string
    }
}) {
    try {
        const { data } = await projectServices.getProjectById(params.projectId)

        if (data.data === undefined) {
            return {
                title: 'Projek tidak ditemukan',
                description: 'Sepertinya projek yang kamu cari tidak ada.',
                project: null,
            }
        }
        return {
            title: `Projek ${data.data.name}`,
            description: data.data.desc,
            images: [data.data.photos],
            project: data.data,
        }
    } catch (error) {
        return {
            title: 'Projek tidak ditemukan',
            description: 'Sepertinya projek yang kamu cari tidak ada.',
            project: null,
        }
    }
}

export default function DetailProjectPage({
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
                    href={'/projects'}
                    className="flex w-fit h-fit gap-2 items-center text-lg"
                >
                    <IoArrowBack></IoArrowBack>
                    <span className="font-medium">Kembali</span>
                </Link>
            </section>
            <ProjectDetail projectId={params.projectId} />
        </>
    )
}
