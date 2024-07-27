import { getData } from '@/libs/firebase/service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const pages = await getData<any>('pages')
    return NextResponse.json({
        status: true,
        statusCode: 200,
        message: 'success',
        data: pages,
    })
}

export async function POST(req: NextRequest) {
    return NextResponse.json(
        {
            status: false,
            statusCode: 405,
            message: 'Method Not Allowed',
        },
        { status: 405 }
    )
}
