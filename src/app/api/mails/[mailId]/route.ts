import { getDataById, updateData, deleteData } from '@/libs/firebase/service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    { params }: { params: { mailId: string } }
) {
    const id = params.mailId
    const mail = await getDataById<Mail>('mails', id)

    if (mail?.isUnread) {
        await updateData('mails', id, {
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
    const id = params.mailId
    try {
        await deleteData('mails', id)

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
