'use client'

import PrimaryButton from '@/components/Button/PrimaryButton'
import TableLayout from '@/components/Layout/TableLayout'
import Dropdown from '@/components/Other/Dropdown'
import NotFound from '@/components/Other/NotFound'
import Table from '@/components/Other/Table'
import projectServices from '@/services/projects'
import Image from 'next/image'
import { useEffect, useState } from 'react'
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
            <TableLayout>
                <TableLayout.Header
                    title="List Projek"
                    desc="Anda dapat melihat, menambahkan, mengubah dan menghapus
                        informasi projek yang akan ditampilkan kepada pengguna."
                />

                <TableLayout.Buttons>
                    <PrimaryButton
                        href={'/dashboard/projects/add'}
                        theme={'black'}
                        className="inline-block w-fit truncate text-[0.5rem] leading-none"
                    >
                        Tambah Projek
                    </PrimaryButton>
                </TableLayout.Buttons>

                <TableLayout.Content loading={loading}>
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                <Table.Header className="w-1/12 text-center">
                                    #
                                </Table.Header>
                                <Table.Header className="w-2/12">
                                    Pratinjau
                                </Table.Header>
                                <Table.Header className="w-5/12">
                                    Nama Projek
                                </Table.Header>
                                <Table.Header className="w-1/12">
                                    Tahun
                                </Table.Header>
                                <Table.Header className="w-2/12">
                                    Kategori
                                </Table.Header>
                                <Table.Header className="w-1/12 text-center">
                                    Aksi
                                </Table.Header>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            <>
                                {projects.map((project, index) => {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Data className="w-1/12 text-center">
                                                {index + 1}
                                            </Table.Data>
                                            <Table.Data className="w-2/12">
                                                <Image
                                                    src={`/img/projects/${project.id}/${project.thumbnail.photo}`}
                                                    alt={project.thumbnail.desc}
                                                    width="200"
                                                    height="100"
                                                    className=""
                                                />
                                            </Table.Data>
                                            <Table.Data className="w-5/12">
                                                {project.name}
                                            </Table.Data>
                                            <Table.Data className="w-1/12">
                                                {project.month} {project.year}
                                            </Table.Data>
                                            <Table.Data className="w-2/12">
                                                {project.category}
                                            </Table.Data>
                                            <Table.Data className="w-1/12 grid place-items-center">
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
                                                    </Dropdown.Items>
                                                </Dropdown>
                                            </Table.Data>
                                        </Table.Row>
                                    )
                                })}
                            </>
                        </Table.Body>
                    </Table>
                </TableLayout.Content>
            </TableLayout>
        </>
    )
}
