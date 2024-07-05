import { Dialog, DialogPanel } from '@headlessui/react'

export default function WarnModal({
    isOpen,
    open,
    close,
    title,
    content,
    onSubmit,
    cancelButton = 'Tidak',
    confirmButton = 'Ya, Saya Yakin',
}: {
    isOpen: boolean
    open: () => void
    close: () => void
    title: string
    content: string
    onSubmit: () => void
    cancelButton?: string
    confirmButton?: string
}) {
    return (
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
                        className="w-fit h-full max-w-2xl relative bg-white/90 p-2 lg:p-5 duration-300 ease-out data-[closed]:opacity-0 rounded"
                    >
                        <div className="w-full flex flex-col gap-2">
                            <h1 className={`text-2xl font-semibold`}>
                                {title}
                            </h1>
                            <span className={`font-medium`}>{content}</span>
                            <div className="w-full flex justify-end items-center gap-2 mt-3">
                                <button
                                    onClick={close}
                                    className={`w-36 inline-block py-2 px-4 text-sm text-center rounded shadow-sm bg-stone-300 text-black font-semibold`}
                                >
                                    {cancelButton}
                                </button>
                                <button
                                    onClick={onSubmit}
                                    className={`w-36 inline-block py-2 px-4 text-sm text-center rounded shadow-sm bg-black text-white`}
                                >
                                    {confirmButton}
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
