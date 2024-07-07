'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'
import WarnModal from '@/components/Modal/WarnModal'
import PrimaryButton from '@/components/Button/PrimaryButton'

export default function BottomMenu() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    return (
        <>
            <div
                className={`flex flex-col gap-4 w-full h-fit place-self-end lg:mt-8`}
            >
                <PrimaryButton
                    type="button"
                    theme="black"
                    onClick={openModal}
                    className="w-full grid place-items-center"
                >
                    Logout
                </PrimaryButton>
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
