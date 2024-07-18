import ProjectList from '@/components/Section/Landing/ProjectList'

export function generateMetadata() {
    return {
        title: 'Projek',
        description:
            'Jelajahi berbagai projek yang telah saya kerjakan sebagai drafter dan surveyor. Dari visualisasi eksterior hingga manajemen proyek, temukan hasil karya terbaik saya di sini.',
    }
}

export default function ProjectPage() {
    return (
        <>
            <ProjectList />
        </>
    )
}
