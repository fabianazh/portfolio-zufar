import { getData, addData } from '@/libs/firebase/service'
import { NextRequest, NextResponse } from 'next/server'
import slugify from 'slugify'

export async function GET(req: NextRequest) {
    const tools = await getData<Tool>('tools')
    return NextResponse.json({
        status: true,
        statusCode: 200,
        message: 'success',
        data: tools,
    })
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        await addData(
            'tools',
            data.data,
            slugify(data.data.name, { lower: true })
        )

        return NextResponse.json({
            status: true,
            statusCode: 200,
            message: 'Perangkat berhasil dibuat!',
        })
    } catch (error) {
        return NextResponse.json({
            status: false,
            statusCode: 500,
            message: 'Perangkat gagal dibuat!',
            error: error,
        })
    }
}
