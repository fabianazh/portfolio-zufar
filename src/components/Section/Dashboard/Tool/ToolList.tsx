'use client'

import PrimaryButton from '@/components/Button/PrimaryButton'
import TableLayout from '@/components/Layout/TableLayout'
import Dropdown from '@/components/Other/Dropdown'
import NotFound from '@/components/Other/NotFound'
import Table from '@/components/Other/Table'
import toolServices from '@/services/tools'
import { useEffect, useState } from 'react'
import { RxDotsVertical } from 'react-icons/rx'

export default function ToolList() {
    const [tools, setTools] = useState<Tool[] | null | undefined>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchTools() {
            try {
                const { data } = await toolServices.getAllTools()
                setTools(data.data)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchTools()
    }, [])

    if (error || !tools) {
        return <NotFound message="Belum ada data tool." />
    }

    return (
        <>
            <TableLayout>
                <TableLayout.Header
                    title="List Tool"
                    desc="Anda dapat melihat, menambahkan, mengubah dan menghapus
                        informasi tool."
                />

                <TableLayout.Buttons>
                    <PrimaryButton
                        href={'/dashboard/tools/add'}
                        theme={'black'}
                        className="inline-block w-fit truncate text-[0.5rem] leading-none"
                    >
                        Tambah Tool
                    </PrimaryButton>
                </TableLayout.Buttons>

                <TableLayout.Content loading={loading}>
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                <Table.Header className="w-1/12 text-center">
                                    #
                                </Table.Header>
                                <Table.Header className="w-4/12">
                                    Nama Tool
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
                                {tools.map((tool, index) => {
                                    return (
                                        <Table.Row key={tool.id}>
                                            <Table.Data className="w-1/12 text-center">
                                                {index + 1}
                                            </Table.Data>
                                            <Table.Data className="w-4/12">
                                                {tool.name}
                                            </Table.Data>
                                            <Table.Data className="w-1/12">
                                                {tool.name}
                                            </Table.Data>
                                            <Table.Data className="w-2/12">
                                                {tool.link}
                                            </Table.Data>
                                            <Table.Data className="w-1/12 grid place-items-center">
                                                <Dropdown>
                                                    <Dropdown.Trigger>
                                                        <RxDotsVertical />
                                                    </Dropdown.Trigger>
                                                    <Dropdown.Items>
                                                        <Dropdown.Item
                                                            href={`/dashboard/tools/${tool.id}`}
                                                        >
                                                            Detail
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            href={`/dashboard/tools/${tool.id}/edit`}
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
