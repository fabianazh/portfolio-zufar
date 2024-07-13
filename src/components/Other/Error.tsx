import Image from 'next/image'

export default function Error({
    message = 'Data kosong.',
}: {
    message: string
}) {
    return (
        <section className="w-full min-h-screen flex flex-col gap-3 justify-center items-center fixed top-0 right-0 overflow-hidden lg:pl-80">
            <Image
                src={'/illustrations/void.svg'}
                alt="Empty"
                width={300}
                height={200}
                className="lg:w-72 h-fit mb-3"
            />
            <span className="font-medium text-lg">{message}</span>
        </section>
    )
}
