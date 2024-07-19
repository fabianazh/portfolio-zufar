import { getData } from '@/libs/firebase/service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const projects = await getData<Project>('projects')
    return NextResponse.json({
        status: true,
        statusCode: 200,
        message: 'success',
        data: projects,
    })
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        // await addData(
        //     'tools',
        //     data.data,
        //     slugify(data.data.name, { lower: true })
        // )

        return NextResponse.json({
            status: false,
            statusCode: 200,
            message: 'Projek berhasil dibuat!',
        })
    } catch (error) {
        return NextResponse.json({
            status: false,
            statusCode: 500,
            message: 'Projek gagal dibuat!',
            error: error,
        })
    }
}
