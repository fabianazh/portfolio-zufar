import EditTool from '@/components/Section/Dashboard/Tool/EditTool'
import toolServices from '@/services/tools'

export async function generateMetadata({
    params,
}: {
    params: {
        toolId: string
    }
}) {
    try {
        const { data } = await toolServices.getToolById(params.toolId)

        if (data.data === undefined) {
            return {
                title: 'Perangkat tidak ditemukan',
                description: 'Sepertinya perangkat yang kamu cari tidak ada.',
            }
        }
        return {
            title: `Perangkat ${data.data.name}`,
            description: data.data.name,
        }
    } catch (error) {
        return {
            title: 'Perangkat tidak ditemukan',
            description: 'Sepertinya perangkat yang kamu cari tidak ada.',
        }
    }
}

export default function EditToolPage({
    params,
}: {
    params: { toolId: string }
}) {
    return (
        <>
            <EditTool toolId={params.toolId} />
        </>
    )
}
