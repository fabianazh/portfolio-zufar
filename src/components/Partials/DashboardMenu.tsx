'use client'

import { usePathname } from 'next/navigation'

export default function DashboardMenu() {
    const pathname = usePathname()
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
                <div className="w-full py-2 px-4 text-sm text-center rounded shadow-sm bg-black text-white">
                    Logout
                </div>
            </div>
        </>
    )
}
