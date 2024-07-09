import { NextRequest, NextResponse } from 'next/server'
import { addData } from '@/libs/firebase/service'

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        await addData('messages', data.data)

        return NextResponse.json({
            status: true,
            statusCode: 200,
            message: 'Pesan berhasil dikirim!',
        })
    } catch (error) {
        return NextResponse.json({
            status: false,
            statusCode: 500,
            message: 'Pesan gagal dikirim!',
        })
    }
}
