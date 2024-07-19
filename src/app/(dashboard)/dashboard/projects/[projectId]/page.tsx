import ProjectDetail from '@/components/Section/Dashboard/Project/ProjectDetail'
import projectServices from '@/services/projects'

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
            <ProjectDetail projectId={params.projectId} />
        </>
    )
}
