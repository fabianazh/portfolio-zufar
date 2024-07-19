import CreateProject from '@/components/Section/Dashboard/Project/CreateProject'

export function generateMetadata() {
    return {
        title: 'Tambah Projek',
    }
}

export default function CreateProjectPage() {
    return (
        <>
            <CreateProject />
        </>
    )
}
