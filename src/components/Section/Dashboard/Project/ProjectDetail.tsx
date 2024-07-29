'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import ImageDetailModal from '@/components/Modal/ImageDetailModal'
import ActionLayout from '@/components/Layout/ActionLayout'
import projectServices from '@/services/projects'
import LinkText from '@/components/Typography/LinkText'
import BackButton from '@/components/Button/BackButton'
import Dropdown from '@/components/Other/Dropdown'
import { RxDotsVertical } from 'react-icons/rx'
import TextInput from '@/components/Form/TextInput'
import FileInput from '@/components/Form/FileInput'
import CheckboxInput from '@/components/Form/CheckboxInput'
import TextareaInput from '@/components/Form/TextareaInput'
import WarnModal from '@/components/Modal/WarnModal'
import { useRouter } from 'next/navigation'
import { useToast } from '@/context/ToastContext'

export default function ProjectDetail({ projectId }: { projectId: string }) {
    const [project, setProject] = useState<Project | null | undefined>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false)
    const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] =
        useState<boolean>(false)
    const [modalData, setModalData] = useState({ photo: '', alt: '' })
    const [previewMode, setPreviewMode] = useState<boolean>(false)
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)

    const router = useRouter()
    const { showToast } = useToast()
    const lastIndex = project?.tools.length

    useEffect(() => {
        async function fetchProject() {
            try {
                const { data } = await projectServices.getProjectById(projectId)
                setProject(data.data)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchProject()
    }, [])

    if (error) {
        return <></>
    }

    async function handleDeleteProject() {
        try {
            setSubmitLoading(true)
            const response = await projectServices.deleteProject(projectId)
            if (response.data.status === true) {
                showToast(response.data.message, { type: 'success' })
                router.push('/dashboard/projects')
            } else {
                showToast(response.data.message, { type: 'error' })
            }
        } catch (error) {
            showToast('Error', { type: 'error' })
        } finally {
            setSubmitLoading(false)
            setIsDeleteProjectModalOpen(false)
        }
    }

    return (
        <>
            <ActionLayout
                returnLink={'/dashboard/projects'}
                isLoading={loading}
                isEmpty={!project}
                emptyMessage="Projek tidak ditemukan."
            >
                <ActionLayout.Buttons>
                    <BackButton href={'/dashboard/projects'} />
                    <Dropdown>
                        <Dropdown.Trigger>
                            <div className="w-7 lg:w-8 h-7 lg:h-8 grid place-items-center rounded-full bg-stone-200 transition-all duration-300 bg-stone-100 shadow-sm">
                                <RxDotsVertical />
                            </div>
                        </Dropdown.Trigger>
                        <Dropdown.Items>
                            <Dropdown.Item
                                onClick={() => setPreviewMode(!previewMode)}
                            >
                                {previewMode ? 'Mode Form' : 'Mode Preview'}
                            </Dropdown.Item>
                            <Dropdown.Item
                                href={`/dashboard/projects/${project?.id}/edit`}
                            >
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                                as="delete"
                                onClick={() =>
                                    setIsDeleteProjectModalOpen(true)
                                }
                            >
                                Hapus
                            </Dropdown.Item>
                        </Dropdown.Items>
                    </Dropdown>
                </ActionLayout.Buttons>
                {!previewMode && (
                    <ActionLayout.Header
                        title={`Detail Projek ${project?.name}`}
                        desc="Anda dapat mengubah dan menghapus informasi projek yang akan ditampilkan kepada pengguna."
                    />
                )}
                <ActionLayout.Content
                    className={`w-full h-fit flex flex-col ${
                        previewMode ? 'gap-2.5' : 'gap-6'
                    }`}
                >
                    {previewMode ? (
                        <>
                            {/* Thumbnail  */}
                            <div className="w-full flex h-fit overflow-hidden scale-100">
                                <Image
                                    onClick={() => {
                                        setIsImageModalOpen(true)
                                        setModalData({
                                            photo: `${project?.thumbnail[0]}`,
                                            alt: `${project?.id}`,
                                        })
                                    }}
                                    src={`${project?.thumbnail[0]}`}
                                    alt={`Projek ${project?.name}`}
                                    width={900}
                                    height={700}
                                    layout="responsive"
                                    objectFit="contain"
                                    draggable={false}
                                    className={`w-full h-auto cursor-pointer`}
                                />
                            </div>
                            {/* End Thumbnail  */}
                            <div className="w-full h-fit flex flex-col lg:flex-row justify-between gap-2 lg:gap-4 mb-2 lg:mb-0">
                                <div className="w-full lg:w-4/12 flex flex-col">
                                    <span className="text-sm font-medium">
                                        Nama Projek
                                    </span>
                                    <span className="text-base font-semibold lg:font-bold">
                                        {project?.name}
                                    </span>
                                </div>

                                <div className="w-full lg:w-3/12 flex flex-col">
                                    <span className="text-sm font-medium">
                                        Kategori
                                    </span>
                                    <span className="text-base font-semibold lg:font-bold">
                                        {project?.category}
                                    </span>
                                </div>

                                <div className="w-full lg:w-3/12 flex flex-col">
                                    <span className="text-sm font-medium">
                                        Tools
                                    </span>
                                    <div>
                                        {project?.tools.map((tool, index) => (
                                            <LinkText
                                                href={tool.link}
                                                className="text-base font-semibold lg:font-bold"
                                                key={tool.name}
                                            >
                                                {tool.name}
                                                {index + 1 == lastIndex
                                                    ? '.'
                                                    : ', '}
                                            </LinkText>
                                        ))}
                                    </div>
                                </div>

                                <div className="w-full lg:w-fit flex flex-col">
                                    <span className="text-sm font-medium">
                                        Tahun
                                    </span>
                                    <span className="text-base font-semibold lg:font-bold">
                                        {project?.date}
                                    </span>
                                </div>
                            </div>
                            {/* Description */}
                            <div className="w-full h-fit flex flex-col my-2">
                                <span className="font-medium">
                                    {project?.desc}
                                </span>
                            </div>
                            {/* End Description */}
                            {/* Images */}
                            <div className="w-full h-auto flex flex-col gap-3">
                                <span className="font-semibold text-sm lg:text-base">
                                    Gambar Lainnya
                                </span>
                                <div className="w-full columns-1 lg:columns-2 gap-4 lg:gap-6 h-fit">
                                    {project?.photos.map((photo, index) => (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                setIsImageModalOpen(true)
                                                setModalData({
                                                    photo: `${photo}`,
                                                    alt: `${project.id}`,
                                                })
                                            }}
                                            className="w-full relative h-full group cursor-pointer mb-4 lg:mb-6"
                                        >
                                            <Image
                                                src={`${photo}`}
                                                alt={`${photo}`}
                                                width={700}
                                                height={900}
                                                layout="responsive"
                                                className={`h-full group-hover:brightness-75 transition-all`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* End Images */}
                        </>
                    ) : (
                        <>
                            <FileInput
                                label="Thumbnail"
                                readOnly
                                id="thumbnail"
                                accept=".jpg,.png"
                                className="w-full"
                                inputClassName="w-full lg:w-6/12"
                                preview={project?.thumbnail ?? []}
                            />
                            <TextInput
                                label="Nama Projek"
                                readOnly
                                id="name"
                                className="lg:w-6/12"
                                type="text"
                                value={project?.name}
                            />
                            <TextareaInput
                                label="Deskripsi"
                                readOnly
                                id="desc"
                                className="lg:w-6/12"
                                rows={4}
                                value={project?.desc}
                            />
                            <TextInput
                                label="Kategori Projek"
                                readOnly
                                id="category"
                                className="lg:w-6/12"
                                type="text"
                                value={project?.category}
                            />
                            <CheckboxInput label="Perangkat">
                                {project?.tools?.map((tool, index) => (
                                    <label key={index} className="mb-4">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked
                                        />

                                        <span className="checkbox">
                                            {tool.name}
                                        </span>
                                    </label>
                                ))}
                            </CheckboxInput>
                            <div className="w-full lg:w-6/12 flex flex-row gap-4">
                                <TextInput
                                    label="Bulan"
                                    readOnly
                                    id="name"
                                    className="lg:w-6/12"
                                    type="text"
                                    value={project?.date.split(' ')[0]}
                                />
                                <TextInput
                                    label="Tahun"
                                    readOnly
                                    id="name"
                                    className="lg:w-6/12"
                                    type="text"
                                    value={project?.date.split(' ')[1]}
                                />
                            </div>
                            <FileInput
                                label="Gambar Projek"
                                readOnly
                                id="photos"
                                multiple
                                accept=".jpg,.png"
                                className="w-full lg:w-full"
                                inputClassName="w-full lg:w-full"
                                preview={project?.photos ?? []}
                            />
                        </>
                    )}
                </ActionLayout.Content>
            </ActionLayout>
            {/* Modal */}
            <ImageDetailModal
                isOpen={isImageModalOpen}
                close={() => setIsImageModalOpen(false)}
                photo={modalData.photo}
                alt={modalData.alt}
            />

            <WarnModal
                isOpen={isDeleteProjectModalOpen}
                close={() => setIsDeleteProjectModalOpen(false)}
                confirmButtonColor="red"
                title={`Apakah kamu yakin ingin menghapus projek ${project?.name}?`}
                content={`Dengan menghapus projek ${project?.name}, seluruh data dan aset dari projek ini akan dihapus permanen dan tidak dapat dikembalikan.`}
                onSubmit={handleDeleteProject}
                loading={submitLoading}
            />

            {/* End Modal */}
        </>
    )
}
