import Image from 'next/image'
import Link from 'next/link'

export default function NotFound({
    message = 'Tidak dapat menemukan halaman yang dicari.',
}: {
    message: string
}) {
    return (
        <section className="w-full min-h-screen flex flex-col gap-3 justify-center items-center fixed top-0 right-0 overflow-hidden lg:pl-80">
            <Image
                src={'/illustrations/empty.svg'}
                alt="Not Found"
                width={300}
                height={200}
                className="lg:w-72 h-fit mb-3"
            />
            <h2 className="text-2xl font-semibold">404 | Not Found</h2>
            <span className="font-medium text-lg">{message}</span>
            <Link href="/" className="group relative w-fit inline-block">
                <span>Kembali ke beranda</span>
                <div
                    className={`absolute w-full h-0.5 bottom-0 left-0 bg-black origin-bottom-right transition-transform duration-300 scale-x-0 group-hover:scale-x-100 group-hover:origin-bottom-left`}
                />
            </Link>
        </section>
    )
}
