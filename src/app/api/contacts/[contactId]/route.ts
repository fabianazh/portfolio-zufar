import { getDataById, updateData } from '@/libs/firebase/service'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(
    req: NextRequest,
    { params }: { params: { contactId: string } }
) {
    const contactId = params.contactId
    const contacts = await getDataById<Contact>('contacts', contactId)
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
    const data = await req.json()
    const contactId = params.contactId
    const token = req.headers.get('Authorization')?.split(' ')[1] ?? ''

    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(
                token,
                process.env.NEXTAUTH_SECRET as string,
                (err, decoded) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(decoded)
                    }
                }
            )
        })

        await updateData('contacts', contactId, data.data)

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
