import PageList from '@/components/Section/Dashboard/Page/PageList'

export function generateMetadata() {
    return {
        title: 'List Halaman',
    }
}

export default function CreateProjectPage() {
    return (
        <>
            <PageList />
        </>
    )
}
