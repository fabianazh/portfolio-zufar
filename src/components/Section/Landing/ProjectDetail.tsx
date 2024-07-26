'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import ProjectDetailSkeleton from '@/components/Skeleton/ProjectDetailSkeleton'
import ImageDetailModal from '@/components/Modal/ImageDetailModal'
import ActionLayout from '@/components/Layout/ActionLayout'
import projectServices from '@/services/projects'
import LinkText from '@/components/Typography/LinkText'
import BackButton from '@/components/Button/BackButton'

export default function ProjectDetail({ projectId }: { projectId: string }) {
    const [project, setProject] = useState<Project | null | undefined>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalData, setModalData] = useState({ photo: '', alt: '' })

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
    }, [projectId])

    if (error) {
        return <></>
    }

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    const lastIndex = project?.tools.length

    return (
        <>
            <ActionLayout
                returnLink={'/projects'}
                isLoading={loading}
                loadingSkeleton={<ProjectDetailSkeleton />}
                isEmpty={!project}
                emptyMessage="Projek tidak ditemukan."
            >
                <ActionLayout.Buttons>
                    <BackButton href={'/projects'} />
                </ActionLayout.Buttons>
                <ActionLayout.Content className="w-full h-fit flex flex-col gap-2.5">
                    {/* Thumbnail  */}
                    <div className="w-full flex h-fit overflow-hidden scale-100">
                        <Image
                            onClick={() => {
                                openModal()
                                setModalData({
                                    photo: `${project?.id}/${project?.thumbnail}`,
                                    alt: project?.id ?? '',
                                })
                            }}
                            src={`/img/projects/${project?.id}/${project?.thumbnail}`}
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
                            <span className="text-base font-bold">
                                {project?.name}
                            </span>
                        </div>

                        <div className="w-full lg:w-3/12 flex flex-col">
                            <span className="text-sm font-medium">
                                Kategori
                            </span>
                            <span className="text-base font-bold">
                                {project?.category}
                            </span>
                        </div>

                        <div className="w-full lg:w-3/12 flex flex-col">
                            <span className="text-sm font-medium">Tools</span>
                            <div>
                                {project?.tools.map((tool, index) => (
                                    <LinkText
                                        href={tool.url}
                                        className="text-base font-bold"
                                        key={tool.name}
                                    >
                                        {tool.name}
                                        {index + 1 == lastIndex ? '.' : ', '}
                                    </LinkText>
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-fit flex flex-col">
                            <span className="text-sm font-medium">Tahun</span>
                            <span className="text-base font-bold">
                                {project?.date}
                            </span>
                        </div>
                    </div>
                    {/* Description */}
                    <div className="w-full h-fit flex flex-col">
                        <span className="font-medium">{project?.desc}</span>
                    </div>
                    {/* End Description */}
                    {/* Images */}
                    <div className="w-full h-auto flex flex-col gap-3">
                        <span className="font-semibold text-base">
                            Gambar Lainnya
                        </span>
                        <div className="w-full columns-1 lg:columns-2 gap-4 lg:gap-6 h-fit">
                            {project?.photos.map((photo, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        openModal()
                                        setModalData({
                                            photo: `${project?.id}/${photo}`,
                                            alt: project.id ?? '',
                                        })
                                    }}
                                    className="w-full relative h-full group cursor-pointer mb-4 lg:mb-6"
                                >
                                    <Image
                                        src={`/img/projects/${project?.id}/${photo}`}
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
                </ActionLayout.Content>
            </ActionLayout>
            {/* Modal */}
            <ImageDetailModal
                isOpen={isModalOpen}
                close={closeModal}
                photo={`/img/projects/${modalData.photo}`}
                alt={modalData.alt}
            />
            {/* End Modal */}
        </>
    )
}
