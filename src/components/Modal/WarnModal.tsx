import { Dialog, DialogPanel } from '@headlessui/react'
import PrimaryButton from '@/components/Button/PrimaryButton'
import Loaders from '@/components/Other/Loader'

export default function WarnModal({
    isOpen,
    close,
    title,
    content,
    onSubmit,
    cancelButton = 'Batal',
    confirmButton = 'Ya, Saya Yakin',
    confirmButtonColor = 'black',
    loading,
}: {
    isOpen: boolean
    close: () => void
    title: string
    content: string
    onSubmit: () => void
    cancelButton?: string
    confirmButton?: string
    confirmButtonColor?: 'black' | 'red' | 'gray'
    loading?: boolean
}) {
    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-50 focus:outline-none"
            onClose={close}
        >
            <div className="fixed inset-0 z-50 w-screen h-screen overflow-y-auto bg-black/70">
                <div className="flex min-h-full items-center justify-center p-3 lg:p-4">
                    <DialogPanel
                        transition
                        className="w-fit h-full max-w-2xl relative bg-white p-4 lg:p-5 duration-300 ease-out data-[closed]:opacity-0 rounded"
                    >
                        <form className="w-full flex flex-col gap-2">
                            <h1 className={`text-2xl font-semibold`}>
                                {title}
                            </h1>
                            <span className={`lg:font-medium`}>{content}</span>
                            <div className="w-full flex justify-end items-center gap-2 mt-3">
                                <PrimaryButton
                                    as="button"
                                    onClick={close}
                                    type="button"
                                    theme="gray"
                                    className={`w-36 grid place-items-center shrink-0`}
                                    disabled={loading}
                                >
                                    {cancelButton}
                                </PrimaryButton>
                                <PrimaryButton
                                    as="button"
                                    onClick={onSubmit}
                                    type="button"
                                    theme={confirmButtonColor}
                                    className={`w-36 grid place-items-center shrink-0`}
                                    disabled={loading}
                                >
                                    {loading ? <Loaders /> : confirmButton}
                                </PrimaryButton>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
