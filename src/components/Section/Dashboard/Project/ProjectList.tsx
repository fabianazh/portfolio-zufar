'use client'

import GridLayout from '@/components/Layout/GridLayout'
import ProjectsCardSkeleton from '@/components/Skeleton/ProjectsCardSkeleton'
import projectServices from '@/services/projects'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BsPlus } from 'react-icons/bs'
import ProjectCard from '@/components/Card/ProjectCard'
import { useToast } from '@/context/ToastContext'
import WarnModal from '@/components/Modal/WarnModal'

export default function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const [modalData, setModalData] = useState({ id: '', name: '' })

    const { showToast } = useToast()

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    async function fetchProjects() {
        try {
            const { data } = await projectServices.getAllProjects()
            setProjects(data.data)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    async function handleDeleteProject(id: string) {
        try {
            setSubmitLoading(true)
            const response = await projectServices.deleteProject(id)
            if (response.data.status === true) {
                showToast(response.data.message, { type: 'success' })
            } else {
                showToast(response.data.message, { type: 'error' })
            }
            fetchProjects()
        } catch (error) {
            showToast('Error', { type: 'error' })
        } finally {
            setSubmitLoading(false)
            closeModal()
        }
    }

    if (error) {
        return <></>
    }

    return (
        <>
            <GridLayout>
                <GridLayout.Header
                    title="List Projek"
                    desc="Anda dapat melihat, menambahkan, mengubah dan menghapus
                        informasi projek yang akan ditampilkan kepada pengguna."
                />
                <GridLayout.Items
                    isLoading={loading}
                    loadingSkeleton={<ProjectsCardSkeleton />}
                >
                    <Link
                        href={`/dashboard/projects/add`}
                        className="w-full relative aspect-video flex-col flex items-center justify-center hover:bg-stone-100 rounded overflow-hidden transition-all duration-300 bg-white border mb-8 lg:mb-4"
                    >
                        <BsPlus className="text-4xl font-medium" />
                        <span className="text-base lg:text-lg font-semibold">
                            Tambah Projek
                        </span>
                    </Link>

                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            href={`/dashboard/projects/${project.id}`}
                            project={project}
                            setModalData={setModalData}
                            openModal={openModal}
                            withDropdown
                        />
                    ))}
                </GridLayout.Items>
            </GridLayout>
            <WarnModal
                isOpen={isModalOpen}
                close={closeModal}
                confirmButtonColor="red"
                title={`Apakah kamu yakin ingin menghapus projek ${modalData.name}?`}
                content={`Dengan menghapus projek ${modalData.name}, seluruh data dan aset dari projek ini akan dihapus permanen dan tidak dapat dikembalikan.`}
                onSubmit={() => handleDeleteProject(modalData.id)}
                loading={submitLoading}
            />
        </>
    )
}
