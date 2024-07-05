'use client'

import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import WarnModal from '@/components/Modal/WarnModal'

export default function DashboardMenu() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const pathname = usePathname()

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    return (
        <>
            <div
                className={`${
                    pathname.startsWith('/dashboard') ? 'flex' : 'hidden'
                } flex-col gap-4 w-full h-fit place-self-end lg:mt-8`}
            >
                <div className="w-full py-2 px-4 text-sm text-center rounded shadow-sm bg-stone-200">
                    Akun
                </div>
                <button
                    onClick={openModal}
                    className="w-full py-2 px-4 text-sm text-center rounded shadow-sm bg-black text-white"
                >
                    Logout
                </button>
            </div>

            <WarnModal
                isOpen={isModalOpen}
                open={openModal}
                close={closeModal}
                title={'Apakah kamu yakin ingin logout?'}
                content="Dengan logout, Anda akan keluar dari akun Anda dan perlu login kembali untuk mengakses fitur yang memerlukan autentikasi."
                onSubmit={() => signOut()}
            />
        </>
    )
}
