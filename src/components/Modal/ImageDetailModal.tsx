import { Dialog, DialogPanel } from '@headlessui/react'
import Image from 'next/image'
import { BiX } from 'react-icons/bi'

export default function ImageDetailModal({
    isOpen,
    open,
    close,
    photo,
    desc,
}: {
    isOpen: boolean
    open: () => void
    close: () => void
    photo: string
    desc: string
}) {
    return (
        <>
            <Dialog
                open={isOpen}
                as="div"
                className="relative z-50 focus:outline-none"
                onClose={close}
            >
                <div className="fixed inset-0 z-50 w-screen h-screen overflow-y-auto bg-black/70">
                    {/* Close Button */}

                    <div
                        onClick={close}
                        className={`absolute w-fit h-fit top-5 right-0 lg:right-5 cursor-pointer transition-all duration-300 ${
                            isOpen
                                ? 'scale-100 opacity-100'
                                : 'scale-50 opacity-0'
                        }`}
                    >
                        <BiX className="text-4xl lg:text-5xl text-white transition-all duration-300 hover:text-stone-50"></BiX>
                    </div>
                    {/* End Close Button */}
                    <div className="flex min-h-full items-center justify-center p-2 lg:p-4">
                        <DialogPanel
                            transition
                            className="w-fit h-full max-w-4xlx relative bg-white/90 p-2 lg:p-4 pb-3 duration-300 ease-out data-[closed]:opacity-0"
                        >
                            <div className="w-fit max-w-5xl h-fit flex flex-col gap-3">
                                <Image
                                    src={photo}
                                    alt={desc}
                                    width={900}
                                    height={800}
                                    layout="responsive"
                                    objectFit="contain"
                                    draggable={false}
                                    className={`w-auto h-full shrink-0 shadow-md`}
                                />
                                <div className="flex relative w-full h-fit justify-center">
                                    <span className="text-base font-semibold text-black">
                                        {desc}
                                    </span>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
