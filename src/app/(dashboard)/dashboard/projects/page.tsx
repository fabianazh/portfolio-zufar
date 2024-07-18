import ProjectList from '@/components/Section/Dashboard/Project/ProjectList'

export function generateMetadata() {
    return {
        title: 'List Projek',
    }
}

export default function ProjectPage() {
    return (
        <>
            <ProjectList />
        </>
    )
}
