'use client'

import GridLayout from '@/components/Layout/GridLayout'
import Dropdown from '@/components/Other/Dropdown'
import NotFound from '@/components/Other/NotFound'
import projectServices from '@/services/projects'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BsPlus } from 'react-icons/bs'
import { RxDotsVertical } from 'react-icons/rx'

export default function ProjectList() {
    const [projects, setProjects] = useState<Project[] | null | undefined>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
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
        fetchProjects()
    }, [])

    if (error || !projects) {
        return <NotFound message="Belum ada data projek." />
    }

    return (
        <>
            <GridLayout>
                <GridLayout.Header
                    title="List Projek"
                    desc="Anda dapat melihat, menambahkan, mengubah dan menghapus
                        informasi projek yang akan ditampilkan kepada pengguna."
                />
                <GridLayout.Items loading={loading}>
                    <Link
                        href={`/dashboard/projects/add`}
                        className="w-full relative aspect-video flex-col flex items-center justify-center bg-stone-100 rounded overflow-hidden transition-all duration-300 hover:bg-stone-200/80 shadow-sm"
                    >
                        <BsPlus className="text-4xl font-medium" />
                        <span className="text-base lg:text-lg font-semibold">
                            Tambah Projek
                        </span>
                    </Link>

                    {projects.map((project) => {
                        return (
                            <div
                                key={project.id}
                                className="w-full relative h-fit flex-col flex gap-3 pb-8 mb-8 lg:mb-4"
                            >
                                <Link
                                    href={`/dashboard/projects/${project.id}`}
                                    className="w-full flex h-fit overflow-hidden group"
                                >
                                    <Image
                                        src={`/img/projects/${project.id}/${project.thumbnail.photo}`}
                                        alt={`Projek ${project.name}`}
                                        width={300}
                                        height={400}
                                        layout="responsive"
                                        draggable={false}
                                        className={`w-full h-full group-hover:opacity-80 transition-all`}
                                    />
                                </Link>
                                <div className="flex w-full text-sm gap-2 text-black font-semibold absolute bottom-0 left-0 jusifty-between items-center">
                                    <div className="truncate w-11/12">
                                        {project.name}
                                    </div>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <RxDotsVertical />
                                        </Dropdown.Trigger>
                                        <Dropdown.Items>
                                            <Dropdown.Item
                                                href={`/dashboard/projects/${project.id}`}
                                            >
                                                Detail
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                href={`/dashboard/projects/${project.id}/edit`}
                                            >
                                                Edit
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item className="bg-red-500 hover:bg-red-400 text-white">
                                                Hapus
                                            </Dropdown.Item>
                                        </Dropdown.Items>
                                    </Dropdown>
                                </div>
                            </div>
                        )
                    })}
                </GridLayout.Items>
            </GridLayout>
        </>
    )
}
