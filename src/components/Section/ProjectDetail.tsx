'use client'

import { getProjectById } from '@/libs/utils/getProjectData'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Modal from '@/components/Other/Modal'
import ProjectDetailSkeleton from '@/components/Skeleton/ProjectDetailSkeleton'
import NotFound from '@/app/not-found'

export default function ProjectDetail({ projectId }: { projectId: string }) {
    const [project, setProject] = useState<Project | null | undefined>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalData, setModalData] = useState({ photo: '', desc: '' })

    useEffect(() => {
        async function fetchProject() {
            try {
                const projectData = await getProjectById(projectId)
                setProject(projectData)
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

    if (error || !project) {
        return <NotFound message="Tidak dapat menemukan projek yang dicari." />
    }

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    const lastIndex = project.tools.length

    return (
        <>
            <section className="w-full flex flex-col gap-8">
                {/* Thumbnail  */}
                <div className="w-full h-fit flex flex-col gap-2.5">
                    <div className="w-full flex h-fit overflow-hidden scale-100 mb-2">
                        <Image
                            onClick={() => {
                                openModal()
                                setModalData({
                                    photo: project.thumbnail.photo,
                                    desc: project.name,
                                })
                            }}
                            src={`/img/projects/${project.thumbnail.photo}`}
                            alt={`Projek ${project.thumbnail.desc}`}
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
                                {project.name}
                            </span>
                        </div>

                        <div className="w-full lg:w-3/12 flex flex-col">
                            <span className="text-sm font-medium">
                                Kategori
                            </span>
                            <span className="text-base font-bold">
                                {project.category}
                            </span>
                        </div>

                        <div className="w-full lg:w-3/12 flex flex-col">
                            <span className="text-sm font-medium">Tools</span>
                            <div>
                                {project.tools.map((tool, index) => (
                                    <span
                                        className="text-base font-bold"
                                        key={tool}
                                    >
                                        {tool}
                                        {index + 1 == lastIndex ? '.' : ', '}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-fit flex flex-col">
                            <span className="text-sm font-medium">Tahun</span>
                            <span className="text-base font-bold">
                                {project.month} {project.year}
                            </span>
                        </div>
                    </div>
                    {/* Description */}
                    <div className="w-full h-fit flex flex-col">
                        <span className="font-medium">{project.desc}</span>
                    </div>
                    {/* End Description */}
                </div>
                {/* End Thumbnail  */}

                <Modal isOpen={isModalOpen} open={openModal} close={closeModal}>
                    <div className="w-fit max-w-5xl h-fit flex flex-col gap-3">
                        <Image
                            src={`/img/projects/${modalData.photo}`}
                            alt={`Projek ${modalData.desc}`}
                            width={900}
                            height={800}
                            layout="responsive"
                            objectFit="contain"
                            draggable={false}
                            className={`w-auto h-full shrink-0 shadow-md`}
                        />
                        <div className="flex relative w-full h-fit justify-center">
                            <span className="text-base font-semibold text-black">
                                {modalData.desc}
                            </span>
                        </div>
                    </div>
                </Modal>

                {/* Images */}
                <div className="w-full h-auto flex flex-col gap-2">
                    <span className="font-semibold text-base">
                        Gambar Lainnya
                    </span>
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 h-fit">
                        {project.photos.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    openModal()
                                    setModalData({
                                        photo: item.photo,
                                        desc: item.desc,
                                    })
                                }}
                                className="w-full relative h-full group cursor-pointer"
                            >
                                <Image
                                    src={`/img/projects/${item.photo}`}
                                    alt={`Projek ${item.desc}`}
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
            </section>
        </>
    )
}
