// import EditProfile from '@/components/Section/Dashboard/Profile/EditProfile'
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
            title: `Edit Profil ${data.data.versionName}`,
            description: data.data.desc,
        }
    } catch (error) {
        return {
            title: 'Profil tidak ditemukan',
            description: 'Sepertinya profil yang kamu cari tidak ada.',
        }
    }
}

export default function EditProfilePage({
    params,
}: {
    params: {
        profileId: string
    }
}) {
    return <></>
}
