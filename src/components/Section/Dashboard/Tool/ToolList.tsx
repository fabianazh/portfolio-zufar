'use client'

import PrimaryButton from '@/components/Button/PrimaryButton'
import TableLayout from '@/components/Layout/TableLayout'
import WarnModal from '@/components/Modal/WarnModal'
import Dropdown from '@/components/Other/Dropdown'
import NotFound from '@/components/Other/NotFound'
import Table from '@/components/Other/Table'
import toolServices from '@/services/tools'
import { useEffect, useState } from 'react'
import { RxDotsVertical } from 'react-icons/rx'
import { useToast } from '@/context/ToastContext'

export default function ToolList() {
    const [tools, setTools] = useState<Tool[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalData, setModalData] = useState({ id: '', name: '' })
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)

    const { showToast } = useToast()

    function openModal(tool: Tool) {
        setModalData(tool)
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

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

    useEffect(() => {
        fetchTools()
    }, [])

    async function deleteTool(id: string) {
        try {
            setSubmitLoading(true)
            const response = await toolServices.deleteTool(id)
            if (response.data.status === true) {
                showToast(response.data.message, { type: 'success' })
            } else {
                showToast(response.data.message, { type: 'error' })
            }
            fetchTools()
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
            <TableLayout>
                <TableLayout.Header
                    title="List Perangkat"
                    desc="Anda dapat melihat, menambahkan, mengubah dan menghapus
                        informasi perangkat."
                />

                <TableLayout.Buttons>
                    <PrimaryButton
                        href={'/dashboard/tools/add'}
                        theme={'black'}
                        className="inline-block w-fit truncate text-[0.5rem] leading-none"
                    >
                        Tambah Perangkat
                    </PrimaryButton>
                </TableLayout.Buttons>

                <TableLayout.Content
                    isLoading={loading}
                    isEmpty={tools?.length < 1}
                    emptyMessage="Belum ada data perangkat."
                >
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                <Table.Header className="w-1/12 text-center">
                                    #
                                </Table.Header>
                                <Table.Header className="w-3/12">
                                    Nama Perangkat
                                </Table.Header>
                                <Table.Header className="w-6/12">
                                    Link
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
                                            <Table.Data className="w-3/12">
                                                {tool.name}
                                            </Table.Data>
                                            <Table.Data className="w-6/12">
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
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item
                                                            as="delete"
                                                            onClick={() =>
                                                                openModal(tool)
                                                            }
                                                        >
                                                            Hapus
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
                <WarnModal
                    isOpen={isModalOpen}
                    close={closeModal}
                    confirmButtonColor="red"
                    title={`Apakah kamu yakin ingin menghapus perangkat ${modalData.name}?`}
                    content={`Dengan menghapus perangkat ${modalData.name}, seluruh data dan aset dari perangkat ${modalData.name} akan dihapus permanen dan tidak dapat dikembalikan.`}
                    onSubmit={() => deleteTool(modalData.id)}
                    loading={submitLoading}
                />
            </TableLayout>
        </>
    )
}
