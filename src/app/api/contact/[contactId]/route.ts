import { getDataById, updateData } from '@/libs/firebase/service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    { params }: { params: { contactId: string } }
) {
    const id = params.contactId
    const contacts = await getDataById<Contact>('contacts', id)
    return NextResponse.json({
        status: true,
        statusCode: 200,
        message: 'success',
        data: contacts,
    })
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { contactId: string } }
) {
    const id = params.contactId
    try {
        const data = await req.json()
        await updateData('contacts', id, data.data)

        return NextResponse.json({
            status: true,
            statusCode: 200,
            message: 'Update info kontak berhasil!',
            data: data,
        })
    } catch (error) {
        return NextResponse.json({
            status: false,
            statusCode: 500,
            message: 'Update info kontak gagal!',
        })
    }
}
