import Image from 'next/image'

export default function Empty({
    message = 'Data kosong.',
    fullPage = false,
}: {
    message: string
    fullPage?: boolean
}) {
    return (
        <div
            className={`w-full flex flex-col gap-3 justify-center items-center ${
                fullPage
                    ? ' min-h-screen fixed top-0 right-0 overflow-hidden lg:pl-80'
                    : 'my-3'
            }`}
        >
            <Image
                src={'/illustrations/empty.svg'}
                alt="Empty"
                width={300}
                height={200}
                className={`h-fit mb-3 ${fullPage ? 'lg:w-72' : 'lg:w-56'}`}
            />
            <span className="font-medium text-lg">{message}</span>
        </div>
    )
}
