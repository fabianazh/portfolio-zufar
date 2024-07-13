'use client'

import toolServices from '@/services/tools'
import { useEffect, useState } from 'react'
import ActionLayout from '@/components/Layout/ActionLayout'
import TextInput from '@/components/Form/TextInput'
import PrimaryButton from '@/components/Button/PrimaryButton'
import Loaders from '@/components/Other/Loader'
import { useRouter } from 'next/navigation'
import { useToast } from '@/context/ToastContext'
import WarnModal from '@/components/Modal/WarnModal'

export default function ToolDetail({ toolId }: { toolId: string }) {
    const [tool, setTool] = useState<Tool | null>(null)
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    const router = useRouter()
    const { showToast } = useToast()

    useEffect(() => {
        async function getToolDetail() {
            try {
                const { data } = await toolServices.getToolById(toolId)
                setTool(data.data)
            } catch (error) {
            } finally {
                setLoading(false)
            }
        }

        getToolDetail()
    }, [toolId])

    async function deleteTool(id: string) {
        try {
            setSubmitLoading(true)
            const response = await toolServices.deleteTool(id)
            if (response.data.status === true) {
                showToast(response.data.message, { type: 'success' })
                router.push('/dashboard/tools')
            } else {
                showToast(response.data.message, { type: 'error' })
            }
        } catch (error) {
            showToast('Error', { type: 'error' })
        } finally {
            setSubmitLoading(false)
            closeModal()
        }
    }

    return (
        <ActionLayout
            returnLink={`/dashboard/tools`}
            isLoading={loading}
            isEmpty={!tool}
            emptyMessage="Tidak dapat menemukan data perangkat."
        >
            <ActionLayout.Header
                title={`Detail Perangkat ${tool?.name}`}
                desc="Anda dapat merubah dan menghapus informasi perangkat yang akan
                            ditampilkan kepada pengguna telah sesuai dengan yang
                            diinginkan."
            />
            <ActionLayout.Content>
                <form className="w-full lg:w-6/12 h-fit flex flex-col gap-6">
                    <TextInput
                        label="Nama"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Masukan nama perangkat"
                        inputClassName="bg-stone-200/50"
                        value={tool?.name}
                        readOnly
                    />
                    <TextInput
                        label="Link"
                        id="link"
                        type="text"
                        name="link"
                        placeholder="Masukan link perangkat"
                        inputClassName="bg-stone-200/50"
                        value={tool?.link}
                        readOnly
                    />
                    <div className="w-full lg:w-8/12 grid grid-cols-2 gap-6">
                        <PrimaryButton
                            theme="gray"
                            href={`/dashboard/tools/${tool?.id}/edit`}
                            className="w-full grid place-items-center"
                        >
                            Edit
                        </PrimaryButton>
                        <PrimaryButton
                            type="button"
                            onClick={() => openModal()}
                            theme="red"
                            disabled={submitLoading}
                            className="w-full grid place-items-center"
                        >
                            {submitLoading ? <Loaders /> : 'Hapus'}
                        </PrimaryButton>
                    </div>
                </form>
            </ActionLayout.Content>
            <WarnModal
                isOpen={isModalOpen}
                close={closeModal}
                confirmButtonColor="red"
                title={`Apakah kamu yakin ingin menghapus perangkat ${tool?.name}?`}
                content={`Dengan menghapus perangkat ${tool?.name}, seluruh data dan aset dari perangkat ${tool?.name} akan dihapus permanen dan tidak dapat dikembalikan.`}
                onSubmit={() => deleteTool(tool?.id ?? '')}
                loading={submitLoading}
            />
        </ActionLayout>
    )
}
