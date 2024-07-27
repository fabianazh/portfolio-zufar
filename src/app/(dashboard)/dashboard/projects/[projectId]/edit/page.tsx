import EditProject from '@/components/Section/Dashboard/Project/EditProject'
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
            }
        }
        return {
            title: `Edit Projek ${data.data.name}`,
            description: data.data.desc,
            images: [data.data.photos],
        }
    } catch (error) {
        return {
            title: 'Projek tidak ditemukan',
            description: 'Sepertinya projek yang kamu cari tidak ada.',
        }
    }
}

export default function EditProjectPage({
    params,
}: {
    params: {
        projectId: string
    }
}) {
    return (
        <>
            <EditProject projectId={params.projectId} />
        </>
    )
}
