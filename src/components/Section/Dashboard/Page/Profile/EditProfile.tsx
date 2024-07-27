'use client'

import Article from '@/components/Typography/Article'
import LinkText from '@/components/Typography/LinkText'
import Record from '@/components/Typography/Record'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import pageServices from '@/services/pages'
import { useRouter } from 'next/navigation'
import { useToast } from '@/context/ToastContext'
import ActionLayout from '@/components/Layout/ActionLayout'
import BackButton from '@/components/Button/BackButton'
import ProfileDetailSkeleton from '@/components/Skeleton/ProfileDetailSkeleton'

export default function ProfileDetail() {
    const [profile, setProfile] = useState<Profile | null | undefined>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const router = useRouter()
    const { showToast } = useToast()

    useEffect(() => {
        async function getProfileDetail() {
            try {
                const { data } = await pageServices.getPageById('about')
                setProfile(data.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        getProfileDetail()
    }, [])

    if (error) {
        return <></>
    }

    return (
        <ActionLayout
            isLoading={loading}
            className="w-full flex flex-col gap-6"
            returnLink="/dashboard/pages"
            isEmpty={!profile}
            emptyMessage="Tidak dapat menemukan data profil."
            loadingSkeleton={<ProfileDetailSkeleton />}
        >
            <ActionLayout.Buttons>
                <BackButton href={'/dashboard/pages'} />
            </ActionLayout.Buttons>
            <ActionLayout.Header
                title={`Detail Halaman Profil`}
                desc="Anda dapat menggunakan, mengubah dan menghapus informasi profil yang akan ditampilkan kepada pengguna."
            />
            <ActionLayout.Content>
                <></>
            </ActionLayout.Content>
        </ActionLayout>
    )
}
