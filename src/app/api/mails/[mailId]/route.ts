import { getDataById, updateData, deleteData } from '@/libs/firebase/service'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(
    req: NextRequest,
    { params }: { params: { mailId: string } }
) {
    const mailId = params.mailId
    const mail = await getDataById<Mail>('mails', mailId)

    if (mail?.isUnread) {
        await updateData('mails', mailId, {
            isUnread: false,
        })
    }

    return NextResponse.json({
        status: true,
        statusCode: 200,
        message: 'success',
        data: mail,
    })
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { mailId: string } }
) {
    const mailId = params.mailId
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

        await deleteData('mails', mailId)

        return NextResponse.json({
            status: true,
            statusCode: 200,
            message: 'Pesan berhasil dihapus!',
        })
    } catch (error) {
        return NextResponse.json({
            status: false,
            statusCode: 500,
            message: 'Pesan gagal dihapus!',
        })
    }
}
