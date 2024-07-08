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
    const contacts = await updateData('contacts', id, req.formData)
    return NextResponse.json({
        status: true,
        statusCode: 200,
        message: 'success',
        data: contacts,
    })
}
