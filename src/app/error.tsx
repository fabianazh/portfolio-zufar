'use client'

import Image from 'next/image'

export default function NotFound() {
    return (
        <section className="w-full min-h-screen flex flex-col gap-3 justify-center items-center fixed top-0 right-0 overflow-hidden">
            <Image
                src={'/illustrations/empty.svg'}
                alt="Not Found"
                width={300}
                height={200}
                className="lg:w-72 h-fit mb-3"
            />
            <span className="font-medium text-lg">Terjadi kesalahan.</span>
        </section>
    )
}
