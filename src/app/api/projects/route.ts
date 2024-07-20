import { getData, addData } from '@/libs/firebase/service'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import slugify from 'slugify'

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
    const data = await req.json()
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

        await addData(
            'projects',
            data.data,
            slugify(data.data.name, { lower: true })
        )

        return NextResponse.json({
            status: true,
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
