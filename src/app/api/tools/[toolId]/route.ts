import { deleteData, getDataById, updateData } from '@/libs/firebase/service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    { params }: { params: { toolId: string } }
) {
    const id = params.toolId
    const tools = await getDataById<Tool>('tools', id)
    return NextResponse.json({
        status: true,
        statusCode: 200,
        message: 'success',
        data: tools,
    })
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { toolId: string } }
) {
    const id = params.toolId
    try {
        const data = await req.json()
        await updateData('tools', id, data.data)

        return NextResponse.json({
            status: true,
            statusCode: 200,
            message: 'Perangkat berhasil diperbarui!',
        })
    } catch (error) {
        return NextResponse.json({
            status: false,
            statusCode: 500,
            message: 'Perangkat gagal diperbarui!',
        })
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { toolId: string } }
) {
    const id = params.toolId
    try {
        await deleteData('tools', id)

        return NextResponse.json({
            status: true,
            statusCode: 200,
            message: 'Perangkat berhasil dihapus!',
        })
    } catch (error) {
        return NextResponse.json({
            status: false,
            statusCode: 500,
            message: 'Perangkat gagal dihapus!',
        })
    }
}
