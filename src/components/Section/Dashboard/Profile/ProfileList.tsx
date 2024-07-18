'use client'

import Link from 'next/link'
import profileServices from '@/services/profiles'
import { useEffect, useState } from 'react'
import GridLayout from '@/components/Layout/GridLayout'
import { BsPlus } from 'react-icons/bs'
import ProfileCard from '@/components/Card/ProfileCard'
import ProfilesCardSkeleton from '@/components/Skeleton/ProfilesCardSkeleton'

export default function ProfileList() {
    const [profiles, setProfiles] = useState<Profile[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchProfiles() {
            try {
                const { data } = await profileServices.getAllProfiles()
                setProfiles(data.data)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchProfiles()
    }, [])

    if (error) {
        return <></>
    }

    return (
        <>
            <GridLayout>
                <GridLayout.Header
                    title="List Profil"
                    desc="Anda dapat melihat, menambahkan, mengubah dan menghapus
                         profil yang akan ditampilkan kepada pengguna."
                />
                <GridLayout.Items
                    isLoading={loading}
                    loadingSkeleton={<ProfilesCardSkeleton />}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4 lg:gap-x-6 lg:gap-y-6"
                >
                    <Link
                        href={`/dashboard/profiles/add`}
                        className="w-full relative h-48 flex-col flex items-center justify-center hover:bg-stone-100 rounded overflow-hidden transition-all duration-300 bg-white border"
                    >
                        <BsPlus className="text-4xl font-medium" />
                        <span className="text-base lg:text-lg font-semibold">
                            Tambah Profil
                        </span>
                    </Link>

                    {profiles.map((profile) => (
                        <>
                            <ProfileCard
                                href={`/dashboard/profiles/${profile.id}`}
                                key={profile.id}
                                profile={profile}
                            />
                        </>
                    ))}
                </GridLayout.Items>
            </GridLayout>
        </>
    )
}
