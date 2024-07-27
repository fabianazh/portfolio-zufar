import { getDataById, updateData } from '@/libs/firebase/service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    { params }: { params: { pageId: string } }
) {
    const id = params.pageId
    const page = await getDataById<any>('pages', id)
    return NextResponse.json({
        status: true,
        statusCode: 200,
        message: 'success',
        data: page,
    })
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { pageId: string } }
) {
    const id = params.pageId
    try {
        const data = await req.json()
        await updateData('pages', id, data.data)

        return NextResponse.json({
            status: true,
            statusCode: 200,
            message: 'Update halaman berhasil!',
            data: data,
        })
    } catch (error) {
        return NextResponse.json({
            status: false,
            statusCode: 500,
            message: 'Update halaman gagal!',
        })
    }
}
