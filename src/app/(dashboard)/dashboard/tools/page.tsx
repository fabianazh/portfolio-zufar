import ToolList from '@/components/Section/Dashboard/Tool/ToolList'

export function generateMetadata() {
    return {
        title: 'List Perangkat',
    }
}

export default function ToolListPage() {
    return (
        <>
            <ToolList />
        </>
    )
}
