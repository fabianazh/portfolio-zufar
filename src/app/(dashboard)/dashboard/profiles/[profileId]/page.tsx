import ProfileDetail from '@/components/Section/Dashboard/Profile/ProfileDetail'
import profileServices from '@/services/profiles'

export async function generateMetadata({
    params,
}: {
    params: {
        profileId: string
    }
}) {
    try {
        const { data } = await profileServices.getProfileById(params.profileId)

        if (data.data === undefined) {
            return {
                title: 'Profil tidak ditemukan',
                description: 'Sepertinya profil yang kamu cari tidak ada.',
            }
        }
        return {
            title: `Profil ${data.data.versionName}`,
            description: data.data.desc,
            images: [data.data.photos],
        }
    } catch (error) {
        return {
            title: 'Profil tidak ditemukan',
            description: 'Sepertinya profil yang kamu cari tidak ada.',
        }
    }
}

export default function DetailProfilePage({
    params,
}: {
    params: {
        profileId: string
    }
}) {
    return (
        <>
            <ProfileDetail profileId={params.profileId} />
        </>
    )
}
