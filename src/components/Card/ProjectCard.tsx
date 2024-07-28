'use client'

import Dropdown from '@/components/Other/Dropdown'
import Image from 'next/image'
import { RxDotsVertical } from 'react-icons/rx'
import Link from 'next/link'

export default function ProjectCard({
    project,
    href,
    className,
    withDropdown = false,
    openModal,
    setModalData,
}: {
    project: Project
    href: string
    className?: string
    withDropdown?: boolean
    openModal?: () => void
    setModalData?: ({ id, name }: { id: string; name: string }) => void
}) {
    return (
        <>
            <div
                className={`w-full relative h-fit flex-col flex gap-3 pb-8 mb-8 lg:mb-4 ${className}`}
            >
                <Link
                    href={href}
                    className="w-full flex h-fit overflow-hidden group"
                >
                    <Image
                        src={`${project.thumbnail[0]}`}
                        alt={`Projek ${project.name}`}
                        width={300}
                        height={400}
                        layout="responsive"
                        draggable={false}
                        className={`w-full h-full group-hover:brightness-80 transition-all`}
                    />
                </Link>
                <div className="flex w-full text-sm gap-2 text-black font-semibold absolute bottom-0 left-0 jusifty-between items-center">
                    {withDropdown ? (
                        <>
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
                                    {openModal && setModalData ? (
                                        <>
                                            <Dropdown.Divider />

                                            <Dropdown.Item
                                                as="delete"
                                                onClick={() => {
                                                    openModal()
                                                    setModalData({
                                                        id: project.id,
                                                        name: project.name,
                                                    })
                                                }}
                                            >
                                                Hapus
                                            </Dropdown.Item>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </Dropdown.Items>
                            </Dropdown>
                        </>
                    ) : (
                        <>
                            <span>{project.date.split(' ')[1]}</span>
                            <span>/</span>
                            <span className="truncate">{project.name}</span>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
