'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import ProjectDetailSkeleton from '@/components/Skeleton/ProjectDetailSkeleton'
import Link from 'next/link'
import ImageDetailModal from '@/components/Modal/ImageDetailModal'
import projectServices from '@/services/projects'
import { IoArrowBack } from 'react-icons/io5'

export default function ProjectDetail({ projectId }: { projectId: string }) {
    const [project, setProject] = useState<Project | null | undefined>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalData, setModalData] = useState({ photo: '', desc: '' })

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

    if (loading) {
        return <ProjectDetailSkeleton />
    }

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
            <section className="w-full flex flex-col gap-8">
                <Link
                    href={'/dashboard/projects'}
                    className="flex w-fit h-fit gap-2 items-center text-lg"
                >
                    <IoArrowBack></IoArrowBack>
                    <span className="font-medium">Kembali</span>
                </Link>
                {/* Thumbnail  */}
                <div className="w-full h-fit flex flex-col gap-2.5">
                    <div className="w-full flex h-fit overflow-hidden scale-100 mb-2">
                        <Image
                            onClick={() => {
                                openModal()
                                setModalData({
                                    photo: `${project?.id}/${project?.thumbnail.photo}`,
                                    desc: `${project?.name}`,
                                })
                            }}
                            src={`/img/projects/${project?.id}/${project?.thumbnail.photo}`}
                            alt={`Projek ${project?.name}`}
                            width={900}
                            height={700}
                            layout="responsive"
                            objectFit="contain"
                            draggable={false}
                            className={`w-full h-auto cursor-pointer`}
                        />
                    </div>
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
                                    <Link
                                        href={tool.url}
                                        className="text-base font-bold"
                                        key={tool.name}
                                    >
                                        {tool.name}
                                        {index + 1 == lastIndex ? '.' : ', '}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-fit flex flex-col">
                            <span className="text-sm font-medium">Tahun</span>
                            <span className="text-base font-bold">
                                {project?.month} {project?.year}
                            </span>
                        </div>
                    </div>
                    {/* Description */}
                    <div className="w-full h-fit flex flex-col">
                        <span className="font-medium">{project?.desc}</span>
                    </div>
                    {/* End Description */}
                </div>
                {/* End Thumbnail  */}

                {/* Images */}
                <div className="w-full h-auto flex flex-col gap-2">
                    <span className="font-semibold text-base">
                        Gambar Lainnya
                    </span>
                    <div className="w-full columns-1 lg:columns-2 gap-4 lg:gap-6 h-fit">
                        {project?.photos.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    openModal()
                                    setModalData({
                                        photo: `${project?.id}/${item.photo}`,
                                        desc: item.desc,
                                    })
                                }}
                                className="w-full relative h-fit border group cursor-pointer mb-4 lg:mb-6"
                            >
                                <Image
                                    src={`/img/projects/${project.id}/${item.photo}`}
                                    alt={`${item.desc}`}
                                    width={700}
                                    height={900}
                                    layout="responsive"
                                    className={`h-fit w-full group-hover:brightness-75 transition-all`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {/* End Images */}

                {/* Modal */}
                <ImageDetailModal
                    isOpen={isModalOpen}
                    open={openModal}
                    close={closeModal}
                    photo={`/img/projects/${modalData.photo}`}
                    desc={modalData.desc}
                />
                {/* End Modal */}
            </section>
        </>
    )
}
