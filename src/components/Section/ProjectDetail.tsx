"use client"

import { getProjectById } from "@/utils/getProjectData"
import Image from "next/image"
import { useEffect, useState } from "react"
import Modal from "@/components/Other/Modal"
import ProjectDetailSkeleton from "@/components/Skeleton/ProjectDetailSkeleton"

export default function ProjectDetail({ projectId }: { projectId: string }) {
    const [project, setProject] = useState<Project | null | undefined>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalData, setModalData] = useState({ photo: "", alt: "" })

    useEffect(() => {
        async function fetchProject() {
            try {
                const projectData = await getProjectById(projectId)
                setProject(projectData)
            } catch (e) {
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
        return <div>Projek tidak ditemukan.</div>
    }

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
        setModalData({ photo: "", alt: "" })
    }

    return (
        <>
            <section className="w-full flex flex-col gap-8">
                {/* Thumbnail  */}
                <div className="w-full h-fit flex flex-col gap-2">
                    <div className="w-full flex h-fit overflow-hidden scale-100 mb-2">
                        <Image
                            onClick={() => {
                                openModal()
                                setModalData({
                                    photo: project.thumbnail.photo,
                                    alt: project.name,
                                })
                            }}
                            src={`/img/projects/${project.thumbnail.photo}`}
                            alt={`Projek ${project.thumbnail.alt}`}
                            width={900}
                            height={700}
                            layout="responsive"
                            objectFit="contain"
                            draggable={false}
                            className={`w-full h-auto cursor-pointer`}
                        />
                    </div>
                    <div className="w-full h-fit flex flex-col lg:flex-row justify-between gap-2 lg:gap-4 mb-2 lg:mb-0">
                        <div className="w-fit flex flex-col">
                            <span className="text-sm font-medium">
                                Nama Projek
                            </span>
                            <span className="text-lg font-semibold">
                                {project.name}
                            </span>
                        </div>

                        <div className="w-fit flex flex-col lg:text-end">
                            <span className="text-sm font-medium">Tahun</span>
                            <span className="text-lg font-semibold">
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
                    <div className="w-fit h-fit flex flex-col items-center gap-2">
                        <Image
                            src={`/img/projects/${modalData.photo}`}
                            alt={`Projek ${modalData.alt}`}
                            width={900}
                            height={800}
                            layout="responsive"
                            objectFit="contain"
                            draggable={false}
                            className={`w-auto h-full`}
                        />
                        <span className="font-semibold text-black">
                            {modalData.alt}
                        </span>
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
                                        alt: item.alt,
                                    })
                                }}
                                className="w-full relative h-full group cursor-pointer"
                            >
                                <Image
                                    src={`/img/projects/${item.photo}`}
                                    alt={`Projek ${item.alt}`}
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
