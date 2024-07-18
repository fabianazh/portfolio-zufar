import ProfileList from '@/components/Section/Dashboard/Profile/ProfileList'

export function generateMetadata() {
    return {
        title: 'List Profil',
    }
}

export default function CreateProjectPage() {
    return (
        <>
            <ProfileList />
        </>
    )
}
