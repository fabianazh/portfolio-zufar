import { Dialog, DialogPanel } from "@headlessui/react"
import { BiX } from "react-icons/bi"

export default function Modal({
    children,
    isOpen,
    open,
    close,
}: {
    children: React.ReactNode
    isOpen: boolean
    open: () => void
    close: () => void
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
                    <div className="flex min-h-full items-center justify-center p-2 lg:p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-4xl relative bg-white p-4 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
                        >
                            {/* Close Button */}
                            <div
                                onClick={close}
                                className={`absolute w-fit h-fit -top-12 right-0 lg:-right-12 cursor-pointer transition-all duration-300 ${
                                    isOpen
                                        ? "scale-100 opacity-100"
                                        : "scale-50 opacity-0"
                                }`}
                            >
                                <BiX className="text-4xl lg:text-5xl text-white"></BiX>
                            </div>
                            {/* End Close Button */}

                            {children}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
